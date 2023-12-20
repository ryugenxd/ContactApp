<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="url" content="{{ url('')}}"/>
        <link rel="icon" type="image/*" href="https://avatars.githubusercontent.com/u/109148993?v=4" />
        <meta name="description" content="SSR LARAVEL REACTJS"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <title>{{config('app.name')}}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        {{-- @vite(['resources/css/app.css','resources/js/main.jsx']) --}}
        {{-- <link rel="stylesheet" href="{{asset('build/assets/app-389ae5d7.css')}}">
        <link rel="stylesheet" href="{{asset('/build/assets/main-93d8b085.css')}}"> --}}
    </head>
    <body class="bg-slate-950 overflow-hidden">
        <div id="ryuapp">
          Contact API
        </div>
    </body>
    {{-- <script src="{{asset('build/assets/main-2d62d89d.js')}}"></script> --}}
</html>
