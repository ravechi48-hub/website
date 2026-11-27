from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Brand, Product, ProductImage

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    readonly_fields = ['preview']

    def preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 50px; border-radius: 4px;" />', obj.image.url)
        return "-"


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'icon', 'created_at']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name']


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'logo_preview', 'created_at']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name']

    def logo_preview(self, obj):
        if obj.logo:
            return format_html('<img src="{}" style="max-height: 35px; border-radius: 4px;" />', obj.logo.url)
        return "-"
    logo_preview.short_description = "Logo"


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['image_preview', 'name', 'category', 'brand', 'sku', 'price_display', 'in_stock', 'created_at']
    list_filter = ['category', 'brand', 'in_stock', 'is_quote_only']
    search_fields = ['name', 'description', 'sku']
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductImageInline]

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 45px; border-radius: 4px;" />', obj.image.url)
        return "-"
    image_preview.short_description = "Image"

    def price_display(self, obj):
        if obj.is_quote_only or obj.price is None:
            return "Quote on Request"
        return f"₹{obj.price}"
    price_display.short_description = "Price"
