import os
from PIL import Image

def compress_and_overwrite_images(directory, quality=50):
    for filename in os.listdir(directory):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.gif', '.heic')):
            img_path = os.path.join(directory, filename)
            try:
                img = Image.open(img_path).convert("RGB")
                # Новое имя такое же, только .webp
                webp_path = os.path.join(directory, f"{os.path.splitext(filename)[0]}.webp")
                img.save(webp_path, 'webp', quality=quality, method=6)
                os.remove(img_path)
                print(f"Обработано и удалено: {filename} -> {os.path.basename(webp_path)}")
            except Exception as e:
                print(f"Ошибка для {filename}: {e}")

# Пример использования:
compress_and_overwrite_images(r'/Users/user/Desktop/sites/pel1x1_new/public/img/food' , quality=50)