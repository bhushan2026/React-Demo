from django.shortcuts import render, redirect
from django.http import JsonResponse
from . import serializers
from .models import Book
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
@csrf_exempt
def Home(request):
    if request.method == 'GET':
        book = Book.objects.all()
        serializer = serializers.BookSerializer(book,many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)

        if isinstance(data, list):  # If it's a list of books, handle multiple objects
            serializer = serializers.BookSerializer(data=data, many=True)
        else:  # If it's a single book, handle it as a single object
            serializer = serializers.BookSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data,status=201,safe=False)
        return JsonResponse(serializer.errors, status=400, safe=False)
    elif request.method == 'DELETE':
        data = JSONParser().parse(request)
        isbn = data.get('isbn', None)

        if not isbn:
            return JsonResponse({'error': 'ISBN is required'}, status=400)

        try:
            # Find the book by ISBN and delete it
            book = Book.objects.get(isbn=isbn)
            book.delete()
            return JsonResponse({'message': 'Book deleted successfully'}, status=204)
        except Book.DoesNotExist:
            return JsonResponse({'error': 'Book not found'}, status=404)
    


