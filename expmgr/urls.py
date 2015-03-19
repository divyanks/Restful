from django.conf.urls import patterns, include, url
from django.contrib import admin
from expmgr.views import Home

urlpatterns = patterns('',
    url( r'^$', Home.as_view() ),
#also stopping admin access	
#    url(r'^admin/', include(admin.site.urls)),
	url( r'^api/', include( 'api.urls' ) ),
)

