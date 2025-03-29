import io
import base64
import logging
import json
import img2pdf
from cairosvg import svg2png, svg2jpeg, svg2pdf
from pillow_heif import register_heif_opener

from django.shortcuts import render
from django.http import JsonResponse
from PIL import Image   # Import Resampling explicitly if needed
from django.views.decorators.csrf import ensure_csrf_cookie,csrf_protect,csrf_exempt
from django.middleware.csrf import get_token

# Register HEIF opener with Pillow
register_heif_opener()

logger = logging.getLogger(__name__)


@ensure_csrf_cookie
def get_csrf_token(request):
    token = get_token(request)
    response = JsonResponse({"CSRF cookie set!": token})
    return response

# @csrf_exempt
@csrf_protect 
def convert_image(request):
    # logger.info(f"Origin: {request.headers.get('Origin')}")
    # logger.info(f"CSRF Token (header): {request.headers.get('X-CSRFToken')}")
    # logger.info(f"CSRF Token (cookie): {request.COOKIES.get('csrftoken')}")
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
                    if conversion_type in ["png_to_jpeg", "png_to_png", "png_to_webp", "png_to_gif", "png_to_pdf", "png_to_svg"]:
                        output_format = conversion_type.split("_")[2].upper()
                        if output_format == "PDF":
                            # Convert to PDF
                            buffer = io.BytesIO()
                            image.save(buffer, format="PNG")
                            buffer.seek(0)
                            pdf_bytes = img2pdf.convert(buffer)
                            result_image = base64.b64encode(pdf_bytes).decode('utf-8')
                        elif output_format == "SVG":
                            # Convert to SVG (Note: This is a simplified approach)
                            buffer = io.BytesIO()
                            image.save(buffer, format="PNG")
                            buffer.seek(0)
                            svg_bytes = svg2png(url=buffer.getvalue())
                            result_image = base64.b64encode(svg_bytes).decode('utf-8')
                        else:
                            converted_image = image.convert("RGB") if output_format in ["JPEG", "WEBP"] else image
                            buffer = io.BytesIO()
                            converted_image.save(buffer, format=output_format, quality=quality)
                            buffer.seek(0)
                            result_image = base64.b64encode(buffer.read()).decode('utf-8')

                    elif conversion_type in ["jpeg_to_png", "jpeg_to_jpeg", "jpeg_to_webp", "jpeg_to_gif", "jpeg_to_pdf", "jpeg_to_svg"]:
                        output_format = conversion_type.split("_")[2].upper()
                        if output_format == "PDF":
                            buffer = io.BytesIO()
                            image.save(buffer, format="JPEG")
                            buffer.seek(0)
                            pdf_bytes = img2pdf.convert(buffer)
                            result_image = base64.b64encode(pdf_bytes).decode('utf-8')
                        elif output_format == "SVG":
                            buffer = io.BytesIO()
                            image.save(buffer, format="JPEG")
                            buffer.seek(0)
                            svg_bytes = svg2png(url=buffer.getvalue())
                            result_image = base64.b64encode(svg_bytes).decode('utf-8')
                        else:
                            converted_image = image.convert("RGB") if output_format in ["JPEG", "WEBP"] else image
                            buffer = io.BytesIO()
                            converted_image.save(buffer, format=output_format, quality=quality)
                            buffer.seek(0)
                            result_image = base64.b64encode(buffer.read()).decode('utf-8')

                    elif conversion_type in ["heic_to_png", "heic_to_jpeg", "heic_to_webp", "heic_to_gif", "heic_to_pdf", "heic_to_svg", "heic_to_heic"]:
                        output_format = conversion_type.split("_")[2].upper()
                        if output_format == "PDF":
                            buffer = io.BytesIO()
                            image.save(buffer, format="PNG")
                            buffer.seek(0)
                            pdf_bytes = img2pdf.convert(buffer)
                            result_image = base64.b64encode(pdf_bytes).decode('utf-8')
                        elif output_format == "SVG":
                            buffer = io.BytesIO()
                            image.save(buffer, format="PNG")
                            buffer.seek(0)
                            svg_bytes = svg2png(url=buffer.getvalue())
                            result_image = base64.b64encode(svg_bytes).decode('utf-8')
                        elif output_format == "HEIC":
                            buffer = io.BytesIO()
                            image.save(buffer, format="HEIC", quality=quality)
                            buffer.seek(0)
                            result_image = base64.b64encode(buffer.read()).decode('utf-8')
                        else:
                            converted_image = image.convert("RGB") if output_format in ["JPEG", "WEBP"] else image
                            buffer = io.BytesIO()
                            converted_image.save(buffer, format=output_format, quality=quality)
                            buffer.seek(0)
                            result_image = base64.b64encode(buffer.read()).decode('utf-8')

                    else:
                        results.append({"error": f"Invalid 'conversion_type': {conversion_type}"})
                        continue
                
                    # if conversion_type == "png_to_jpeg":
                    #     converted_image = image.convert("RGB")
                    #     output_format = "JPEG"
                    # elif conversion_type == "jpeg_to_png":
                    #     converted_image = image
                    #     output_format = "PNG"
                    # else:
                    #     results.append({"error": "Invalid 'conversion_type'"})
                    #     continue

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
