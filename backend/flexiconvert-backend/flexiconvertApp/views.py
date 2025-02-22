
import io
import base64
import logging
import json

from django.shortcuts import render
from django.http import JsonResponse
from PIL import Image   # Import Resampling explicitly if needed
from django.views.decorators.csrf import ensure_csrf_cookie,csrf_protect,csrf_exempt

logger = logging.getLogger(__name__)


@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({"message": "CSRF cookie set!"})

# @csrf_exempt
@csrf_protect 
def convert_image(request):
    logger.info(f"Origin: {request.headers.get('Origin')}")
    logger.info(f"CSRF Token (header): {request.headers.get('X-CSRFToken')}")
    logger.info(f"CSRF Token (cookie): {request.COOKIES.get('csrftoken')}")
    if request.method == "POST":
        try:
            # Parse request payload based on content type
            if request.content_type == "application/json":
                data = json.loads(request.body)  # Parse JSON payload
            else:
                data = request.POST  # Handle form-encoded data

            # Validate that "images" field exists and is a list
            images = data.get("images")
            if not images or not isinstance(images, list):
                return JsonResponse({"error": "Missing or invalid 'images' field. Must be a list."}, status=400)

            results = []

            # Process each image in the list
            for image_data in images:
                try:
                    # Extract data for each image
                    conversion_type = image_data.get("conversion_type")
                    base64_image = image_data.get("image")
                    quality = int(image_data.get("quality", 90))  # Default quality to 90
                    width = image_data.get("width")
                    height = image_data.get("height")

                    # Validate inputs for this image
                    if not conversion_type:
                        results.append({"error": "Missing 'conversion_type'"})
                        continue
                    if not base64_image:
                        results.append({"error": "Missing 'image'"})
                        continue

                    # Decode Base64 image data
                    try:
                        image_bytes = base64.b64decode(base64_image)
                        image = Image.open(io.BytesIO(image_bytes))
                    except Exception:
                        results.append({"error": "Invalid base64-encoded image data"})
                        continue

                    # Resize the image if width and height are provided
                    if width and height:
                        try:
                            width = int(width)
                            height = int(height)
                            image = image.resize((width, height), Image.LANCZOS)

                        except ValueError:
                            results.append({"error": "Invalid 'width' or 'height' values"})
                            continue

                    # Perform the requested conversion
                    if conversion_type == "png_to_jpeg":
                        converted_image = image.convert("RGB")
                        output_format = "JPEG"
                    elif conversion_type == "jpeg_to_png":
                        converted_image = image
                        output_format = "PNG"
                    else:
                        results.append({"error": "Invalid 'conversion_type'"})
                        continue

                    # Save the converted image to a buffer
                    buffer = io.BytesIO()
                    converted_image.save(buffer, format=output_format, quality=quality)
                    buffer.seek(0)

                    # Encode the converted image as Base64
                    result_image = base64.b64encode(buffer.read()).decode('utf-8')

                    # Optionally save the file (local server-side debugging)
                    file_name = f"converted_image_{len(results) + 1}.{output_format.lower()}"

                    # Append the result to the results list
                    results.append({
                        "image": result_image,
                        "format": output_format,
                        "file_name": file_name
                    })

                except Exception as e:
                    results.append({"error": str(e)})

            # Return all results
            return JsonResponse({"results": results})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    else:
        return JsonResponse({"error": "Invalid HTTP method"}, status=405)
