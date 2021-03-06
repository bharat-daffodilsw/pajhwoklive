/**
 * angular-ui-map - This directive allows you to add map elements.
 * @version v0.0.3 - 2013-05-22
 * @link http://angular-ui.github.com
 * @license MIT
 */
(function () {
    function e(e, n, o, i) {
        angular.forEach(n.split(" "), function (n) {
            google.maps.event.addListener(o, n, function (o) {
                i.triggerHandler("map-" + n, o), e.$$phase || e.$apply()
            })
        })
    }

    function n(n, i) {
        o.directive(n, [function () {
            return{restrict:"A", link:function (o, c, a) {
                o.$watch(a[n], function (n) {
                    n && e(o, i, n, c)
                })
            }}
        }])
    }

    var o = angular.module("ui.map", ["ui.event"]);
    o.value("uiMapConfig", {}).directive("uiMap", ["uiMapConfig", "$parse", function (n, o) {
        var i = "bounds_changed center_changed click dblclick drag dragend dragstart heading_changed idle maptypeid_changed mousemove mouseout mouseover projection_changed resize rightclick tilesloaded tilt_changed zoom_changed", c = n || {};
        return{restrict:"A", link:function (n, a, u) {
            var d = angular.extend({}, c, n.$eval(u.uiOptions)), t = new google.maps.Map(a[0], d), l = o(u.uiMap);
            l.assign(n, t), e(n, i, t, a)
        }}
    }]), o.value("uiMapInfoWindowConfig", {}).directive("uiMapInfoWindow", ["uiMapInfoWindowConfig", "$parse", "$compile", function (n, o, i) {
        var c = "closeclick content_change domready position_changed zindex_changed", a = n || {};
        return{link:function (n, u, d) {
            var t = angular.extend({}, a, n.$eval(d.uiOptions));
            t.content = u[0];
            var l = o(d.uiMapInfoWindow), r = l(n);
            r || (r = new google.maps.InfoWindow(t), l.assign(n, r)), e(n, c, r, u), u.replaceWith("<div></div>");
            var g = r.open;
            r.open = function (e, o, c, a, d, t) {
                i(u.contents())(n), g.call(r, e, o, c, a, d, t)
            }
        }}
    }]), n("uiMapMarker", "animation_changed click clickable_changed cursor_changed dblclick drag dragend draggable_changed dragstart flat_changed icon_changed mousedown mouseout mouseover mouseup position_changed rightclick shadow_changed shape_changed title_changed visible_changed zindex_changed"), n("uiMapPolyline", "click dblclick mousedown mousemove mouseout mouseover mouseup rightclick"), n("uiMapPolygon", "click dblclick mousedown mousemove mouseout mouseover mouseup rightclick"), n("uiMapRectangle", "bounds_changed click dblclick mousedown mousemove mouseout mouseover mouseup rightclick"), n("uiMapCircle", "center_changed click dblclick mousedown mousemove mouseout mouseover mouseup radius_changed rightclick"), n("uiMapGroundOverlay", "click dblclick")
})();