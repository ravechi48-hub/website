import os
import sys
import shutil
from pathlib import Path

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ravechi_backend.settings')
import django
django.setup()

from django.contrib.auth import get_user_model
from django.core.files import File
from products.models import Category, Brand, Product

User = get_user_model()

def seed():
    # 1. Superuser
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@ravechi.in', 'admin123')
        print("✅ Superuser 'admin' created (password: admin123)")
    else:
        print("ℹ️ Superuser 'admin' already exists")

    # 2. Categories
    categories_data = [
        {"name": "Computers & Peripherals", "icon": "💻", "description": "Desktops, laptops, monitors, keyboards, mice, and IT accessories."},
        {"name": "Office Stationery", "icon": "📋", "description": "Files, folders, pens, desk accessories, and paper supplies."},
        {"name": "Toners & Printers", "icon": "🖨️", "description": "Original laser toners, ink cartridges, printers, and maintenance units."},
        {"name": "Digital Printing Services", "icon": "🎨", "description": "Commercial color printing, flyers, brochures, binding, and ID printing."},
        {"name": "Housekeeping Supplies", "icon": "🧹", "description": "Commercial floor cleaners, handwash, garbage bins, disinfectants, and paper rolls."},
        {"name": "Books & Stationery", "icon": "📚", "description": "School textbooks, registers, notebooks, drawing books, and art kits."},
    ]

    cat_map = {}
    for c in categories_data:
        cat, created = Category.objects.get_or_create(
            name=c['name'],
            defaults={'icon': c['icon'], 'description': c['description']}
        )
        cat_map[c['name']] = cat
    print(f"✅ {len(cat_map)} categories seeded")

    # 3. Brands
    brands_data = [
        {"name": "3M", "file": "3m.png"},
        {"name": "Canon", "file": "canon.png"},
        {"name": "Casio", "file": "casio.png"},
        {"name": "Camlin", "file": "camlin.png"},
        {"name": "Classmate", "file": "classmate.png"},
        {"name": "Pidilite", "file": "pidilite.png"},
    ]

    brand_map = {}
    source_brands_dir = Path(__file__).resolve().parent.parent / 'ravechi' / 'brands'
    media_brands_dir = Path(__file__).resolve().parent / 'media' / 'brands'
    media_brands_dir.mkdir(parents=True, exist_ok=True)

    for b in brands_data:
        brand, created = Brand.objects.get_or_create(name=b['name'])
        src_file = source_brands_dir / b['file']
        if src_file.exists() and not brand.logo:
            dest_file = media_brands_dir / b['file']
            shutil.copy(src_file, dest_file)
            brand.logo = f"brands/{b['file']}"
            brand.save()
        brand_map[b['name']] = brand
    print(f"✅ {len(brand_map)} brands seeded")

    # 4. Sample Products
    sample_products = [
        {
            "name": "Canon imageCLASS LBP6030W Wireless Laser Printer",
            "category": "Toners & Printers",
            "brand": "Canon",
            "sku": "CAN-LBP6030W",
            "price": 14200.00,
            "is_quote_only": False,
            "in_stock": True,
            "description": "Compact and efficient mono laser printer with built-in Wi-Fi. Ideal for home and small offices with speed up to 18 ppm.",
            "specifications": "Print Speed: 18 ppm\nConnectivity: USB 2.0, Wi-Fi 802.11b/g/n\nResolution: 2400 x 600 dpi equivalent\nPaper Size: A4, B5, A5, Letter, Legal"
        },
        {
            "name": "Canon NPG-59 Black Toner Cartridge",
            "category": "Toners & Printers",
            "brand": "Canon",
            "sku": "CAN-NPG59",
            "price": 3850.00,
            "is_quote_only": False,
            "in_stock": True,
            "description": "High yield genuine black toner cartridge for Canon imageRUNNER 2002, 2004, 2202, 2204 series digital copiers.",
            "specifications": "Page Yield: Approx. 10,200 pages\nCompatibility: iR2002, iR2004, iR2202, iR2204\nColor: Black"
        },
        {
            "name": "Casio MJ-120D Plus Desktop Calculator",
            "category": "Office Stationery",
            "brand": "Casio",
            "sku": "CAS-MJ120D",
            "price": 495.00,
            "is_quote_only": False,
            "in_stock": True,
            "description": "300 steps check and correct desktop calculator with dedicated Tax keys and dual power supply (solar + battery).",
            "specifications": "Display: 12 Digits Large LCD\nPower: Solar + Battery\nFeatures: 300 steps check, Auto review, Tax calculations"
        },
        {
            "name": "Classmate Pulse 6-Subject Spiral Notebook",
            "category": "Books & Stationery",
            "brand": "Classmate",
            "sku": "CLS-PULSE6",
            "price": 280.00,
            "is_quote_only": False,
            "in_stock": True,
            "description": "Premium 300-page spiral notebook with color-coded subject dividers and ultra-smooth ozone-treated paper.",
            "specifications": "Pages: 300\nRuling: Single Line Ruled\nSize: A4\nBinding: Sturdy Twin Wire Spiral"
        },
        {
            "name": "3M Post-it Flags & Sticky Notes Dispenser Combo",
            "category": "Office Stationery",
            "brand": "3M",
            "sku": "3M-POSTIT-CBO",
            "price": 350.00,
            "is_quote_only": False,
            "in_stock": True,
            "description": "Convenient desk dispenser containing neon yellow 3x3 sticky notes and 5-color indexing flags for quick reference.",
            "specifications": "Notes Size: 3 x 3 inches (76mm x 76mm)\nFlag Colors: Neon Pink, Yellow, Green, Orange, Blue\nAdhesive: Repositionable 3M adhesive"
        },
        {
            "name": "Fevicol MR Squeezy White Craft Adhesive (200g)",
            "category": "Office Stationery",
            "brand": "Pidilite",
            "sku": "PID-FEV-200",
            "price": 85.00,
            "is_quote_only": False,
            "in_stock": True,
            "description": "Non-toxic, washable white adhesive with precision nozzle for paper, cardboard, thermocol, and office craft usage.",
            "specifications": "Weight: 200g\nType: Polyvinyl Acetate emulsion\nSafety: Non-hazardous, safe for school and office"
        },
        {
            "name": "Camlin Kokuyo Acrylic Color Set (12 Shades x 20ml)",
            "category": "Books & Stationery",
            "brand": "Camlin",
            "sku": "CAM-ACR-12",
            "price": 420.00,
            "is_quote_only": False,
            "in_stock": True,
            "description": "Richly pigmented, fast-drying acrylic colors for canvas, wood, paper and fabric with high lightfastness.",
            "specifications": "Pack Size: 12 tubes x 20ml\nFinish: Matte with bright pigments\nIntermixable: Yes"
        },
        {
            "name": "High-Volume Commercial Digital Printing Service",
            "category": "Digital Printing Services",
            "brand": "Canon",
            "sku": "RAV-PRT-BULK",
            "price": None,
            "is_quote_only": True,
            "in_stock": True,
            "description": "Institutional booklet printing, color spiral manuals, examination papers, certificates, and ID cards with fast turnaround.",
            "specifications": "Paper Stock: 70gsm to 350gsm\nFinishing: Thermal lamination, spiral, wiro, perfect binding\nTurnaround: Same day for urgent institutional orders"
        }
    ]

    for p in sample_products:
        cat = cat_map[p['category']]
        brand = brand_map.get(p['brand'])
        product, created = Product.objects.get_or_create(
            sku=p['sku'],
            defaults={
                'name': p['name'],
                'category': cat,
                'brand': brand,
                'price': p['price'],
                'is_quote_only': p['is_quote_only'],
                'in_stock': p['in_stock'],
                'description': p['description'],
                'specifications': p['specifications']
            }
        )
    print(f"✅ {len(sample_products)} sample products verified/seeded")

if __name__ == '__main__':
    seed()
