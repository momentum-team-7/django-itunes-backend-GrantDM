from django.shortcuts import render

# Create your views here.

def post_list(request):
    # posts = Post.objects.filter(published_date__lte=timezone.now()).order_by('published_date')
    # posts = Post.objects.all()
    return render(request, 'templates/index.html', {})