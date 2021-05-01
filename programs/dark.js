var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if(isDark)
	console.log('Currently in dark mode');
else
	console.log('Currently not in dark mode');
