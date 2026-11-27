from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.db.models import Q
from .models import Category, Brand, Product, ProductImage
from .serializers import CategorySerializer, BrandSerializer, ProductSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']
    pagination_class = None  # Return all categories for simple dropdowns


class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
    pagination_class = None  # Return all brands for dropdowns


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related('category', 'brand').prefetch_related('gallery_images').all()
    serializer_class = ProductSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description', 'sku', 'brand__name', 'category__name']
    ordering_fields = ['created_at', 'price', 'name']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category')
        brand = self.request.query_params.get('brand')
        in_stock = self.request.query_params.get('in_stock')

        if category:
            if category.isdigit():
                queryset = queryset.filter(category_id=category)
            else:
                queryset = queryset.filter(category__slug=category)

        if brand:
            if brand.isdigit():
                queryset = queryset.filter(brand_id=brand)
            else:
                queryset = queryset.filter(brand__slug=brand)

        if in_stock is not None:
            is_in_stock = in_stock.lower() in ['true', '1']
            queryset = queryset.filter(in_stock=is_in_stock)

        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = serializer.save()

        # Handle multiple additional gallery images if passed as 'gallery_files'
        gallery_files = request.FILES.getlist('gallery_files')
        for f in gallery_files:
            ProductImage.objects.create(product=product, image=f)

        headers = self.get_success_headers(serializer.data)
        # Re-serialize to include gallery images
        full_serializer = self.get_serializer(product)
        return Response(full_serializer.data, status=status.HTTP_201_CREATED, headers=headers)
