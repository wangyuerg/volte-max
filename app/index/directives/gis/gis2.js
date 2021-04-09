
define(function (require, exports, module){
    var url_prefix_ = "http://zjgis.zj.chinamobile.com/";
    console.log("./css/esri.css")
    require("./css/esri.css");
    //require(url_prefix_ + "jsapi/3.13/dijit/themes/tundra/tundra.css");
    //require(url_prefix_ + "gis/api/extra/_gisStyleFix.css");
    //require(url_prefix_ + "jsapi/3.13/init.js");

function getRad(e) {
    return e * PI / 180
}
var basehttp ='http://zjgis.zj.chinamobile.com/jsapi/3.13/';
function loadExtentFile(e, t) {
    var r = e.substring(e.lastIndexOf("/") + 1),
        o = document.getElementById(r);
    if (o) return o;
    if ("js" == t) {
        var i = document.createElement("script");
        return i.setAttribute("id", r),
            i.setAttribute("type", "text/javascript"),
            i.setAttribute("src", e + "?v=" + Math.random()),
            //document.getElementsByTagName("head")[0].appendChild(i),
            i
    }
    if ("css" == t) {
        var a = document.createElement("link");
        return a.setAttribute("id", r),
            a.setAttribute("rel", "stylesheet"),
            a.setAttribute("type", "text/css"),
            a.setAttribute("href", e + "?v=" + Math.random()),
            //document.getElementsByTagName("head")[0].appendChild(a),
            a
    }
}
function _init_Gis_BaiduLayer(e, t) {
    _gis_funcWaitFlag = !1;
    var r = 0,
        o = 0,
        i = 0,
        a = 0; ! e || isNaN(e.xmin) || isNaN(e.ymin) || isNaN(e.xmax) || isNaN(e.ymax) || (r = Number(e.xmin), o = Number(e.ymin), i = Number(e.xmax), a = Number(e.ymax)),
        require([basehttp+"esri/layers/TiledMapServiceLayer", basehttp+"esri/SpatialReference", basehttp+"esri/geometry/Extent", basehttp+"esri/layers/TileInfo", basehttp+"dojo/domReady!"],
            function(e, t, n, l) {
                dojo.declare("BaiduLayer", e, {
                    constructor: function(e) {
                        this._mapStyle = e;
                        var s = 20037508.3427892;
                        this.spatialReference = new t({
                            wkid: 102100
                        }),
                            this.fullExtent = new n(( - s), ( - s), s, s, this.spatialReference),
                            this.initialExtent = new n(r, o, i, a, this.spatialReference),
                            this.tileInfo = new l({
                                rows: 256,
                                cols: 256,
                                compressionQuality: 0,
                                origin: {
                                    x: -s,
                                    y: s
                                },
                                spatialReference: {
                                    wkid: 102100
                                },
                                lods: [{
                                    level: 2,
                                    scale: 147914381.897889,
                                    resolution: 39135.7584820001
                                },
                                    {
                                        level: 3,
                                        scale: 73957190.948944,
                                        resolution: 19567.8792409999
                                    },
                                    {
                                        level: 4,
                                        scale: 36978595.474472,
                                        resolution: 9783.93962049996
                                    },
                                    {
                                        level: 5,
                                        scale: 18489297.737236,
                                        resolution: 4891.96981024998
                                    },
                                    {
                                        level: 6,
                                        scale: 9244648.868618,
                                        resolution: 2445.98490512499
                                    },
                                    {
                                        level: 7,
                                        scale: 4622324.434309,
                                        resolution: 1222.99245256249
                                    },
                                    {
                                        level: 8,
                                        scale: 2311162.217155,
                                        resolution: 611.49622628138
                                    },
                                    {
                                        level: 9,
                                        scale: 1155581.108577,
                                        resolution: 305.748113140558
                                    },
                                    {
                                        level: 10,
                                        scale: 577790.554289,
                                        resolution: 152.874056570411
                                    },
                                    {
                                        level: 11,
                                        scale: 288895.277144,
                                        resolution: 76.4370282850732
                                    },
                                    {
                                        level: 12,
                                        scale: 144447.638572,
                                        resolution: 38.2185141425366
                                    },
                                    {
                                        level: 13,
                                        scale: 72223.819286,
                                        resolution: 19.1092570712683
                                    },
                                    {
                                        level: 14,
                                        scale: 36111.909643,
                                        resolution: 9.55462853563415
                                    },
                                    {
                                        level: 15,
                                        scale: 18055.954822,
                                        resolution: 4.77731426794937
                                    },
                                    {
                                        level: 16,
                                        scale: 9027.977411,
                                        resolution: 2.38865713397468
                                    },
                                    {
                                        level: 17,
                                        scale: 4513.988705,
                                        resolution: 1.19432856685505
                                    },
                                    {
                                        level: 18,
                                        scale: 2256.994353,
                                        resolution: .597164283559817
                                    }]
                            }),
                            this.loaded = !0,
                            this.onLoad(this)
                    },
                    getTileUrl: function(e, t, r) {
                        var o = "",
                            i = e - 1,
                            a = Math.pow(2, i),
                            n = a - 1,
                            l = r - a,
                            s = -t + n;
                        i = e + 1;
                        return "Vector" == this._mapStyle ? o = bd_online1 + "tile/?qt=tile&x=" + l + "&y=" + s + "&z=" + i + "&styles=pl&udt=20141119&scaler=1": "Image" == this._mapStyle ? o = bd_shangetu2 + "it/u=x=" + l + ";y=" + s + ";z=" + i + ";v=009;type=sate&fm=46": "POI" == this._mapStyle && (o = bd_online1 + "tile/?qt=tile&x=" + l + "&y=" + s + "&z=" + i + "&styles=sl&v=041&udt=20141119"),
                            o
                    }
                }),
                    _gis_funcWaitFlag = !0
            })
}
function _init_Gis_ThematicLayer(e, t) {
    _gis_funcWaitFlag = !1;
    var r = 0,
        o = 0,
        i = 0,
        a = 0; ! e || isNaN(e.xmin) || isNaN(e.ymin) || isNaN(e.xmax) || isNaN(e.ymax) || (r = Number(e.xmin), o = Number(e.ymin), i = Number(e.xmax), a = Number(e.ymax)),
        require([basehttp+"esri/layers/TiledMapServiceLayer",basehttp+ "esri/SpatialReference", basehttp+"esri/geometry/Extent", basehttp+"esri/layers/TileInfo", basehttp+"dojo/domReady!"],
            function(e, n, l, s) {
                dojo.declare("BaiduLayer", e, {
                    constructor: function(e) {
                        this._mapStyle = e;
                        var t = 20037508.3427892;
                        this.spatialReference = new esri.SpatialReference({
                            wkid: 102100
                        }),
                            this.fullExtent = new l(( - t), ( - t), t, t, this.spatialReference),
                            this.initialExtent = new l(r, o, i, a, this.spatialReference),
                            this.tileInfo = new s({
                                rows: 256,
                                cols: 256,
                                compressionQuality: 0,
                                origin: {
                                    x: -t,
                                    y: t
                                },
                                spatialReference: {
                                    wkid: 102100
                                },
                                lods: [{
                                    level: 2,
                                    scale: 147914381.897889,
                                    resolution: 39135.7584820001
                                },
                                    {
                                        level: 3,
                                        scale: 73957190.948944,
                                        resolution: 19567.8792409999
                                    },
                                    {
                                        level: 4,
                                        scale: 36978595.474472,
                                        resolution: 9783.93962049996
                                    },
                                    {
                                        level: 5,
                                        scale: 18489297.737236,
                                        resolution: 4891.96981024998
                                    },
                                    {
                                        level: 6,
                                        scale: 9244648.868618,
                                        resolution: 2445.98490512499
                                    },
                                    {
                                        level: 7,
                                        scale: 4622324.434309,
                                        resolution: 1222.99245256249
                                    },
                                    {
                                        level: 8,
                                        scale: 2311162.217155,
                                        resolution: 611.49622628138
                                    },
                                    {
                                        level: 9,
                                        scale: 1155581.108577,
                                        resolution: 305.748113140558
                                    },
                                    {
                                        level: 10,
                                        scale: 577790.554289,
                                        resolution: 152.874056570411
                                    },
                                    {
                                        level: 11,
                                        scale: 288895.277144,
                                        resolution: 76.4370282850732
                                    },
                                    {
                                        level: 12,
                                        scale: 144447.638572,
                                        resolution: 38.2185141425366
                                    },
                                    {
                                        level: 13,
                                        scale: 72223.819286,
                                        resolution: 19.1092570712683
                                    },
                                    {
                                        level: 14,
                                        scale: 36111.909643,
                                        resolution: 9.55462853563415
                                    },
                                    {
                                        level: 15,
                                        scale: 18055.954822,
                                        resolution: 4.77731426794937
                                    },
                                    {
                                        level: 16,
                                        scale: 9027.977411,
                                        resolution: 2.38865713397468
                                    },
                                    {
                                        level: 17,
                                        scale: 4513.988705,
                                        resolution: 1.19432856685505
                                    },
                                    {
                                        level: 18,
                                        scale: 2256.9943523,
                                        resolution: .597164283427525
                                    }]
                            }),
                            this.loaded = !0,
                            this.onLoad(this)
                    },
                    getTileUrl: function(e, r, o) {
                        var i = "",
                            a = e - 1,
                            n = Math.pow(2, a),
                            l = n - 1,
                            s = o - n,
                            c = -r + l;
                        a = e + 1;
                        return "Vector" == this._mapStyle ? i = bd_api2 + "customimage/tile?&x=" + s + "&y=" + c + "&z=" + a + "&udt=20150601&customid=" + t: "Image" == this._mapStyle ? i = bd_shangetu2 + "it/u=x=" + s + ";y=" + c + ";z=" + a + ";v=009;type=sate&fm=46": "POI" == this._mapStyle && (i = bd_online1 + "tile/?qt=tile&x=" + s + "&y=" + c + "&z=" + a + "&styles=sl&v=041&udt=20141119"),
                            i
                    }
                }),
                    _gis_funcWaitFlag = !0
            })
}
function _init_Gis_NormalMap(e, t, r, o) {
    _gis_mapWaitFlag = !1,
        o ? _init_Gis_ThematicLayer(t, o) : _init_Gis_BaiduLayer(t);
    var i = function() {
            require([basehttp+"esri/map", basehttp+"esri/symbols/SimpleFillSymbol", basehttp+"esri/symbols/SimpleLineSymbol", basehttp+"esri/symbols/SimpleMarkerSymbol"],
                function(t, o, i, a) {
                    _mapObject = new t(e, {
                        logo: !1,
                        slider: !0,
                        sliderStyle: "large",
                        maxZoom: 16
                    }),
                        r < 0 ? _mapObject.setZoom(0) : r > 16 ? _mapObject.setZoom(16) : _mapObject.setZoom(r),
                        _gis_BDVector = _utils.addLayerFun("Vector", !0),
                        _gis_BDImage = _utils.addLayerFun("Image", !0),
                        _gis_BDPoi = _utils.addLayerFun("POI", !0),
                        mapGraphicLayer = _utils.addLayerFun("graphicLayer"),
                        mapLabelOverLayer = _utils.addLayerFun("labelLayer"),
                        mapLineOverLayer = _utils.addLayerFun("lineLayer"),
                        mapPointOverLayer = _utils.addLayerFun("pointLayer"),
                        mapEllipseLayer = _utils.addLayerFun("ellipseLayer"),
                        mapPolygonOverLayer = _utils.addLayerFun("polygonLayer"),
                        mapSpatialLayer = _utils.addLayerFun("spatialLayer"),
                        mapSatnavLayer = _utils.addLayerFun("satnavLayer");
                    var n = new i({
                        style: "solid",
                        color: new esri.Color([255, 255, 255, 1]),
                        width: 1
                    });
                    _mapObject.infoWindow.fillSymbol = new o({
                        color: new esri.Color([47, 169, 204, .8]),
                        outline: n,
                        style: "solid"
                    }),
                        _mapObject.infoWindow.lineSymbol = n,
                        _mapObject.infoWindow.markerSymbol = new a({
                            color: new esri.Color([0, 0, 0, 0]),
                            outline: new i({
                                color: new esri.Color([255, 255, 255, 0])
                            }),
                            size: 1
                        }),
                        _gis_BDVector.setVisibility(!0),
                        _gis_BDImage.setVisibility(!1),
                        _gis_BDPoi.setVisibility(!1),
                        __gis_initListener(),
                        _gis_mapWaitFlag = !0
                })
        },
        a = function() {
            _gis_funcWaitFlag ? i() : setTimeout(a, 100)
        };
    a()
}
function __gis_initListener() {
    function e(e, t) {
        var r = e.geometry,
            o = e.symbol,
            i = new Object;
        o.url ? (i.height = o.height, i.width = o.width, i.source = o.url) : (i.color = o.color, "object" == typeof i.color && (i.color = "0x" + _utils.rgbToHexString(i.color.r, i.color.g, i.color.b), i.color = Number(i.color), i.alpha = o.color.a), "string" == typeof i.color && i.color.startsWith("#") && (i.color = i.color.replace("#", "0x"), i.color = Number(i.color)), i.outline = new Object, "object" == typeof o.outline.color && (i.outline.color = "0x" + _utils.rgbToHexString(o.outline.color.r, o.outline.color.g, o.outline.color.b), i.outline.color = Number(i.outline.color), i.outline.alpha = o.outline.color.a), "string" == typeof i.outline.color && i.outline.color.startsWith("#") && (i.outline.color = i.outline.color.replace("#", "0x"), i.outline.color = Number(i.outline.color)), (o.alpha || 0 == o.alpha) && (i.alpha = o.alpha), o.style && (i.style = o.style), (o.size || 0 == o.size) && (i.size = o.size), (o.outline.alpha || 0 == o.outline.alpha) && (i.outline.alpha = o.outline.alpha), o.outline.style && (i.outline.style = o.outline.style), (o.outline.width || 0 == o.outline.width) && (i.outline.width = o.outline.width)),
            i.html = e.attributes.newcontent,
            i.type = r.type;
        for (var a in r.userAttr) i[a] = r.userAttr[a];
        i.mapEventType = t,
            i.id = e.attributes.id;
        var n = _utils.convertPoint(r.x, r.y, 16);
        return i.x = n.x,
            i.y = n.y,
            i
    }
    var t, r, o, i;
    mapPointOverLayer.on("mouse-over",
        function(e) {
            _mapObject.setMapCursor("pointer")
        }),
        mapPointOverLayer.on("mouse-out",
            function(e) {
                _mapObject.setMapCursor("default")
            }),
        dojo.connect(mapPointOverLayer, "onClick",
            function(a) {
                var n = a.graphic,
                    l = n.attributes.canShowTip;
                if (l) {
                    var s = new Object({
                        width: 200,
                        height: 200,
                        title: "",
                        content: n.attributes.newcontent,
                        graphic: n
                    });
                    _utils.infoWindowOpen(s)
                }
                var c = n.attributes.canDrag;
                c ? (r = !0, t && (t.deactivate(), t = null), t = new _utils._gis_Edit(_mapObject), t.activate(_utils._gis_Edit.MOVE, n), i && (dojo.disconnect(i), i = null), i = dojo.connect(t, "onGraphicMove",
                    function(t) {
                        if (_utils._gis_PointDrag.dragFlag) {
                            var r = e(t, "MapEvent_PointMarkerDragging"),
                                o = _utils._gis_PointDrag.callBackFn;
                            _utils.callbackFuncRun(o, r)
                        }
                    }), o && (dojo.disconnect(o), o = null), o = dojo.connect(t, "onGraphicMoveStop",
                    function(i) {
                        if (null != t && (r = !1, t.deactivate(), t = null), dojo.disconnect(o), o = null, _utils._gis_PointDrag.dragEndFlag) {
                            var a = e(i, "MapEvent_PointMarkerDragEnd"),
                                n = _utils._gis_PointDrag.callBackFnEnd;
                            _utils.callbackFuncRun(n, a)
                        }
                        _mapObject.enableMapNavigation()
                    })) : t && (t.deactivate(), t = null)
            }),
        dojo.connect(_mapObject, "onClick",
            function(e) {
                0 == r && (null != t && (t.deactivate(), t = null), _mapObject.enableMapNavigation())
            })
}
function Gis(e) {
    this.appSysKey = e,
        this.appSysName = null,
        this.appSysPass = null,
        this.centerPoint = null,
        this.districtName = null,
        this.divID = "",
        this.extent = null,
        this.FILL_STYLE_BACKWARD_DIAGONAL = "backwarddiagonal",
        this.FILL_STYLE_CROSS = "cross",
        this.FILL_STYLE_DIAGONAL_CROSS = "diagonalcross",
        this.FILL_STYLE_FORWARD_DIAGONAL = "forwarddiagonal",
        this.FILL_STYLE_HORIZONTAL = "horizontal",
        this.FILL_STYLE_NULL = "null",
        this.FILL_STYLE_SOLID = "solid",
        this.FILL_STYLE_VERTICAL = "vertical",
        this.height = null,
        this.LABEL_PLACEMENT_ABOVE = "above",
        this.LABEL_PLACEMENT_BELOW = "below",
        this.LABEL_PLACEMENT_END = "end",
        this.LABEL_PLACEMENT_MIDDLE = "middle",
        this.LABEL_PLACEMENT_START = "start",
        this.level = 5,
        this.LINE_STYLE_DASH = "dash",
        this.LINE_STYLE_DASHDOT = "dashdot",
        this.LINE_STYLE_DASHDOTDOT = "dashdotdot",
        this.LINE_STYLE_DOT = "dot",
        this.LINE_STYLE_NULL = "none",
        this.LINE_STYLE_SOLID = "solid",
        this.MapEvent_ExtentChange = "MapEvent_ExtentChange",
        this.mapExtentChangeEvent = null,
        this.MapEvent_MapClick = "MapEvent_MapClick",
        this.mapClickEvent = null,
        this.MapEvent_MapDBClick = "MapEvent_MapDBClick",
        this.mapDBClickEvent = null,
        this.MapEvent_MapLoad = "MapEvent_MapLoad",
        this.mapOnloadEvent = null,
        this.MapEvent_MapMouseMove = "MapEvent_MapMouseMove",
        this.mapMouseMoveEvent = null,
        this.MapEvent_PointMarkerClick = "MapEvent_PointMarkerClick",
        this.pointMarkClickEvent = null,
        this.MapEvent_PointMarkerDbClick = "MapEvent_PointMarkerDbClick",
        this.pointMarkDBClickEvent = null,
        this.MapEvent_PointMarkerDragEnd = "MapEvent_PointMarkerDragEnd",
        this.MapEvent_PointMarkerDragging = "MapEvent_PointMarkerDragging",
        this.MapEvent_PolygonClick = "MapEvent_PolygonClick",
        this.polygonClickEvent = null,
        this.MapEvent_PolygonDbClick = "MapEvent_PolygonDbClick",
        this.polygonDBClickEvent = null,
        this.MapEvent_PolyLineClick = "MapEvent_PolyLineClick",
        this.polylineClickEvent = null,
        this.mapLoadListenerFunctionName = "",
        this.MARKER_STYLE_CIRCLE = "circle",
        this.MARKER_STYLE_CROSS = "cross",
        this.MARKER_STYLE_DIAMOND = "diamond",
        this.MARKER_STYLE_SQUARE = "square",
        this.MARKER_STYLE_TRIANGLE = "triangle",
        this.MARKER_STYLE_X = "x",
        this.scale = null,
        this.width = null,
        this.transformPoint = !0,
        this.thematicMap = !1,
        this.thematicType = null,
        this.NORMAL = "normal",
        this.DARK = "dark",
        this.LIGHT = "light",
        this.GRASSGREEN = "grassgreen",
        this.REDALERT = "redalert",
        this.MIDNIGHT = "midnight",
        this.PINK = "pink",
        this.DARKGREEN = "darkgreen",
        this.BLUISH = "bluish",
        this.GRAYSCALE = "grayscale",
        this.HARDEDGE = "hardedge",
        this.GOOGLELITE = "googlelite",
        this.DRAW_ARROW = "arrow",
        this.DRAW_CIRCLE = "circle",
        this.DRAW_DOWN_ARROW = "downarrow",
        this.DRAW_ELLIPSE = "ellipse",
        this.DRAW_EXTENT = "extent",
        this.DRAW_FREEHAND_POLYGON = "freehandpolygon",
        this.DRAW_FREEHAND_POLYLINE = "freehandpolyline",
        this.DRAW_LEFT_ARROW = "leftarrow",
        this.DRAW_LINE = "line",
        this.DRAW_MULTI_POINT = "multipoint",
        this.DRAW_POINT = "point",
        this.DRAW_POLYGON = "polygon",
        this.DRAW_POLYLINE = "polyline",
        this.DRAW_RECTANGLE = "rectangle",
        this.DRAW_RIGHT_ARROW = "rightarrow",
        this.DRAW_TRIANGLE = "triangle",
        this.DRAW_UP_ARROW = "uparrow",
        this.districtNameToPointMap = {
            "杭州": {
                x: 15975608.3218694,
                y: 4200433.3103946
            },
            "湖州": {
                x: 15966823.0663737,
                y: 4296779.7528104
            },
            "嘉兴": {
                x: 16055740.2457662,
                y: 4273987.9270327
            },
            "金华": {
                x: 15908405.179482,
                y: 4019601.992359
            },
            "丽水": {
                x: 15945029.2109651,
                y: 3927273.2298652
            },
            "宁波": {
                x: 16171246.2886404,
                y: 4138142.6561725
            },
            "衢州": {
                x: 15803606.3127341,
                y: 4002991.1488029
            },
            "绍兴": {
                x: 16032419.3243247,
                y: 4164221.7925743
            },
            "台州": {
                x: 16144168.2660113,
                y: 3955685.2945622
            },
            "温州": {
                x: 16048267.3413427,
                y: 3856293.2752939
            },
            "舟山": {
                x: 16248823.7215819,
                y: 4157279.6621583
            }
        },
        this.stfg = null
}
function UtilsForGis(_gis) {
    this._gisXmlHttpRequest,
        this._gis_Edit,
        this._gis_PointDrag = {
            dragFlag: !1,
            dragEndFlag: !1,
            callBackFn: null,
            callBackFnEnd: null
        },
        this.thCurrentType = null,
        this.transformPoint = !1,
        this.city_DistCoord = {
            "杭州市": {
                x: 120.1481249,
                y: 30.2696069
            },
            "上城区": {
                x: 120.1645711,
                y: 30.2446511,
                p: "杭州市"
            },
            "下城区": {
                x: 120.1765375,
                y: 30.2835965,
                p: "杭州市"
            },
            "江干区": {
                x: 120.2003343,
                y: 30.2593964,
                p: "杭州市"
            },
            "拱墅区": {
                x: 120.1372581,
                y: 30.3220816,
                p: "杭州市"
            },
            "西湖区": {
                x: 120.1255372,
                y: 30.2619244,
                p: "杭州市"
            },
            "滨江区": {
                x: 120.2072875,
                y: 30.2110654,
                p: "杭州市"
            },
            "萧山区": {
                x: 120.2597637,
                y: 30.1872073,
                p: "杭州市"
            },
            "余杭区": {
                x: 120.2946939,
                y: 30.4218299,
                p: "杭州市"
            },
            "桐庐县": {
                x: 119.6873354,
                y: 29.7955516,
                p: "杭州市"
            },
            "淳安县": {
                x: 119.0368363,
                y: 29.6110529,
                p: "杭州市"
            },
            "建德市": {
                x: 119.2762731,
                y: 29.4773756,
                p: "杭州市"
            },
            "富阳市": {
                x: 119.9556995,
                y: 30.0514187,
                p: "杭州市"
            },
            "临安市": {
                x: 119.7199086,
                y: 30.2363364,
                p: "杭州市"
            },
            "湖州市": {
                x: 120.0819003,
                y: 30.8963247
            },
            "吴兴区": {
                x: 120.1809101,
                y: 30.8595198,
                p: "湖州市"
            },
            "南浔区": {
                x: 120.4135931,
                y: 30.8529079,
                p: "湖州市"
            },
            "德清县": {
                x: 119.9729014,
                y: 30.545168,
                p: "湖州市"
            },
            "长兴县": {
                x: 119.9060113,
                y: 31.0293328,
                p: "湖州市"
            },
            "安吉县": {
                x: 119.6754553,
                y: 30.6407861,
                p: "湖州市"
            },
            "金华市": {
                x: 119.6427717,
                y: 29.0821668
            },
            "婺城区": {
                x: 119.5665661,
                y: 29.0892143,
                p: "金华市"
            },
            "金东区": {
                x: 119.6880242,
                y: 29.1023122,
                p: "金华市"
            },
            "武义县": {
                x: 119.8118133,
                y: 28.8956625,
                p: "金华市"
            },
            "浦江县": {
                x: 119.8879875,
                y: 29.4552354,
                p: "金华市"
            },
            "磐安县": {
                x: 120.4457994,
                y: 29.0567279,
                p: "金华市"
            },
            "兰溪市": {
                x: 119.4554253,
                y: 29.2111332,
                p: "金华市"
            },
            "义乌市": {
                x: 120.07055,
                y: 29.3084488,
                p: "金华市"
            },
            "东阳市": {
                x: 120.2374973,
                y: 29.2921232,
                p: "金华市"
            },
            "永康市": {
                x: 120.0424891,
                y: 28.8914382,
                p: "金华市"
            },
            "嘉兴市": {
                x: 120.751212,
                y: 30.748668
            },
            "南湖区": {
                x: 120.7786617,
                y: 30.7498847,
                p: "嘉兴市"
            },
            "秀洲区": {
                x: 120.7047751,
                y: 30.7676491,
                p: "嘉兴市"
            },
            "嘉善县": {
                x: 120.9218484,
                y: 30.8332795,
                p: "嘉兴市"
            },
            "海盐县": {
                x: 120.9421276,
                y: 30.5289876,
                p: "嘉兴市"
            },
            "海宁市": {
                x: 120.6761274,
                y: 30.5141651,
                p: "嘉兴市"
            },
            "平湖市": {
                x: 121.0110298,
                y: 30.6793708,
                p: "嘉兴市"
            },
            "桐乡市": {
                x: 120.5607887,
                y: 30.632762,
                p: "嘉兴市"
            },
            "丽水市": {
                x: 119.9183957,
                y: 28.4713021
            },
            "莲都区": {
                x: 119.9082986,
                y: 28.4495694,
                p: "丽水市"
            },
            "青田县": {
                x: 120.2851951,
                y: 28.143605,
                p: "丽水市"
            },
            "缙云县": {
                x: 120.0868829,
                y: 28.6622505,
                p: "丽水市"
            },
            "遂昌县": {
                x: 119.2712172,
                y: 28.5953288,
                p: "丽水市"
            },
            "松阳县": {
                x: 119.4765465,
                y: 28.4518468,
                p: "丽水市"
            },
            "云和县": {
                x: 119.5687592,
                y: 28.1193426,
                p: "丽水市"
            },
            "庆元县": {
                x: 119.0576242,
                y: 27.6221915,
                p: "丽水市"
            },
            "景宁县": {
                x: 119.6311614,
                y: 27.9767794,
                p: "丽水市"
            },
            "龙泉市": {
                x: 119.1365835,
                y: 28.0774513,
                p: "丽水市"
            },
            "宁波市": {
                x: 121.6201792,
                y: 29.8626948
            },
            "海曙区": {
                x: 121.5465769,
                y: 29.8775987,
                p: "宁波市"
            },
            "江东区": {
                x: 121.5659855,
                y: 29.869587,
                p: "宁波市"
            },
            "江北区": {
                x: 121.5509311,
                y: 29.8893001,
                p: "宁波市"
            },
            "北仑区": {
                x: 121.840928,
                y: 29.9025654,
                p: "宁波市"
            },
            "镇海区": {
                x: 121.5923139,
                y: 29.9680665,
                p: "宁波市"
            },
            "鄞州区": {
                x: 121.5428246,
                y: 29.8197773,
                p: "宁波市"
            },
            "象山县": {
                x: 121.8653116,
                y: 29.4793463,
                p: "宁波市"
            },
            "宁海县": {
                x: 121.4251387,
                y: 29.2905559,
                p: "宁波市"
            },
            "余姚市": {
                x: 121.1498859,
                y: 30.039426,
                p: "宁波市"
            },
            "慈溪市": {
                x: 121.2622495,
                y: 30.1728145,
                p: "宁波市"
            },
            "奉化市": {
                x: 121.402344,
                y: 29.6573281,
                p: "宁波市"
            },
            "衢州市": {
                x: 118.8542708,
                y: 28.9731411
            },
            "柯城区": {
                x: 118.8666008,
                y: 28.971695,
                p: "衢州市"
            },
            "衢江区": {
                x: 118.9551942,
                y: 28.9835088,
                p: "衢州市"
            },
            "常山县": {
                x: 118.5063635,
                y: 28.9042713,
                p: "衢州市"
            },
            "开化县": {
                x: 118.410264,
                y: 29.1396095,
                p: "衢州市"
            },
            "龙游县": {
                x: 119.1672081,
                y: 29.0310594,
                p: "衢州市"
            },
            "江山市": {
                x: 118.62225,
                y: 28.7405211,
                p: "衢州市"
            },
            "绍兴市": {
                x: 120.5761104,
                y: 30.0329807
            },
            "越城区": {
                x: 120.5779104,
                y: 29.9916269,
                p: "绍兴市"
            },
            "柯桥区": {
                x: 120.4904035,
                y: 30.0843223,
                p: "绍兴市"
            },
            "新昌县": {
                x: 120.900124,
                y: 29.502494,
                p: "绍兴市"
            },
            "诸暨市": {
                x: 120.2423875,
                y: 29.7110909,
                p: "绍兴市"
            },
            "上虞市": {
                x: 120.8640873,
                y: 30.0356272,
                p: "绍兴市"
            },
            "嵊州市": {
                x: 120.8266274,
                y: 29.5637583,
                p: "绍兴市"
            },
            "台州市": {
                x: 121.4163147,
                y: 28.6590981
            },
            "椒江区": {
                x: 121.438167,
                y: 28.6767699,
                p: "台州市"
            },
            "黄岩区": {
                x: 121.2576883,
                y: 28.6529857,
                p: "台州市"
            },
            "路桥区": {
                x: 121.3606866,
                y: 28.5856733,
                p: "台州市"
            },
            "玉环县": {
                x: 121.2275004,
                y: 28.1391114,
                p: "台州市"
            },
            "三门县": {
                x: 121.3912097,
                y: 29.1073234,
                p: "台州市"
            },
            "天台县": {
                x: 121.0024425,
                y: 29.1473618,
                p: "台州市"
            },
            "仙居县": {
                x: 120.7246561,
                y: 28.8498481,
                p: "台州市"
            },
            "温岭市": {
                x: 121.3815874,
                y: 28.3748637,
                p: "台州市"
            },
            "临海市": {
                x: 121.1404696,
                y: 28.8612975,
                p: "台州市"
            },
            "温州市": {
                x: 120.6953402,
                y: 27.9979654
            },
            "鹿城区": {
                x: 120.65125,
                y: 28.0181733,
                p: "温州市"
            },
            "龙湾区": {
                x: 120.8081876,
                y: 27.936075,
                p: "温州市"
            },
            "瓯海区": {
                x: 120.6111192,
                y: 27.970317,
                p: "温州市"
            },
            "洞头区": {
                x: 121.1529141,
                y: 27.8392377,
                p: "温州市"
            },
            "永嘉县": {
                x: 120.6880091,
                y: 28.1569393,
                p: "温州市"
            },
            "平阳县": {
                x: 120.5619419,
                y: 27.6651907,
                p: "温州市"
            },
            "苍南县": {
                x: 120.4218345,
                y: 27.5206663,
                p: "温州市"
            },
            "文成县": {
                x: 120.0867849,
                y: 27.790114,
                p: "温州市"
            },
            "泰顺县": {
                x: 119.7128228,
                y: 27.559618,
                p: "温州市"
            },
            "瑞安市": {
                x: 120.6511604,
                y: 27.7817789,
                p: "温州市"
            },
            "乐清市": {
                x: 120.9813042,
                y: 28.1162546,
                p: "温州市"
            },
            "舟山市": {
                x: 122.2036171,
                y: 29.9877889
            },
            "定海区": {
                x: 122.1024244,
                y: 30.0220423,
                p: "舟山市"
            },
            "普陀区": {
                x: 122.3194336,
                y: 29.972624,
                p: "舟山市"
            },
            "岱山县": {
                x: 122.2219028,
                y: 30.2665642,
                p: "舟山市"
            },
            "嵊泗县": {
                x: 122.4465748,
                y: 30.7279449,
                p: "舟山市"
            }
        },
        this._initGis = function() { !
            function() {
                require([basehttp+"esri/toolbars/edit"],
                    function(e) {
                        _utils._gis_Edit = e
                    })
            } ();
            var e = 0,
                t = "appSysKey=" + _gis.appSysKey,
                r = url_prefix + "gisManager/sm/login/LoginController/verify.do";
            _utils._gisRequestPost(r, !1, t,
                function() {
                    if (4 == _utils._gisXmlHttpRequest.readyState && 200 == _utils._gisXmlHttpRequest.status) {
                        var t = _utils._gisXmlHttpRequest.responseText,
                            r = JSON.parse(t);
                        if (e = r.verifyFlag, 1 == e) {
                            var o = r.result;
                            businessLayerManager = o[0].APP_SYS_LEVEL
                        }
                    }
                });
            var o = dojo.byId(_gis.divID),
                i = o.offsetHeight;
            0 == i && (i = o.style.height.endsWith("%") ? parseInt(o.style.height.replace("%", "")) * dojo.window.getBox().h / 100 : dojo.window.getBox().h);
            var a = o.offsetWidth;
            if (0 == a && (a = o.style.height.endsWith("%") ? parseInt(o.style.width.replace("%", "")) * dojo.window.getBox().w / 100 : dojo.window.getBox().w), _gis.height.indexOf("%") != -1) {
                var n = parseInt(_gis.height.substring(0, _gis.height.indexOf("%")));
                dojo.style(o, "height", i * n / 100 + "px")
            } else _gis.height.indexOf("px") != -1 ? dojo.style(o, "height", _gis.height) : isNaN(_gis.height) ? dojo.style(o, "height", "100%") : dojo.style(o, "height", _gis.height + "px");
            if (_gis.width.indexOf("%") != -1) {
                var n = parseInt(_gis.width.substring(0, _gis.width.indexOf("%")));
                dojo.style(o, "width", a * n / 100 + "px")
            } else _gis.width.indexOf("px") != -1 ? dojo.style(o, "width", _gis.width) : isNaN(_gis.width) ? dojo.style(o, "width", "100%") : dojo.style(o, "width", _gis.width + "px");
            if (0 == e) return alert("授权失败，应用没有权限访问地图，请检查授权码"),
                void(_utils = null);
            try {
                _gis.thematicMap ? _init_Gis_NormalMap(_gis.divID, _gis.extent, _gis.level, _gis.thematicType) : _init_Gis_NormalMap(_gis.divID, _gis.extent, _gis.level)
            } catch(l) {}
            var s = function() {
                    if (_gis.districtName) {
                        var e = _gis.districtNameToPointMap[_gis.districtName];
                        if (e) {
                            var t = new esri.geometry.Point(e.x, e.y, _mapObject.spatialReference);
                            _mapObject.centerAt(t)
                        }
                    } else _gis.centerPoint ? _gis.setMapCenter(_gis.centerPoint) : _gis.extent && _gis.setMapExtent(_gis.extent)
                },
                c = function() {
                    if (_gis_mapWaitFlag) {
                        s(),
                        _gis.modouleConfig || _gis.setModuleShow();
                        var e = _gis.mapLoadListenerFunctionName;
                        _utils.callbackFuncRun(e),
                            _utils.hideLoadingUniversal("loadingStatus")
                    } else setTimeout(c, 100)
                };
            c()
        },
        this._gisRequestGet = function(url, asyn, callBackFun) {
            this._gisXmlHttpRequest = this.createXmlHttpRequest(),
                this._gisXmlHttpRequest.onreadystatechange = eval(callBackFun),
                this._gisXmlHttpRequest.open("GET", url, asyn),
                this._gisXmlHttpRequest.send(null)
        },
        this._gisRequestPost = function(url, asyn, sData, callBackFun) {
            this._gisXmlHttpRequest = this.createXmlHttpRequest(),
                this._gisXmlHttpRequest.onreadystatechange = eval(callBackFun),
                this._gisXmlHttpRequest.open("POST", url, asyn),
                this._gisXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8"),
                this._gisXmlHttpRequest.send(sData)
        },
        this.addEcllipseFun = function(e) {
            var t = e.id;
            if (e && !isNaN(e.x) && !isNaN(e.y)) {
                var r = _utils.convertPoint(e.x, e.y, 11),
                    o = r.x,
                    i = r.y,
                    a = e.width,
                    n = e.height,
                    l = e.widthForEllipseFrame,
                    s = e.colourForEllipseFrame,
                    c = e.alphaForEllipseFrame,
                    p = e.colorForEllipse,
                    u = e.alphaForEllipse,
                    d = e.layer ? e.layer: mapEllipseLayer,
                    y = _utils.getRingsByPointAndWH(o, i, 2 * a, 2 * n),
                    m = new esri.geometry.Polygon({
                        rings: [y],
                        spatialReference: _mapObject.spatialReference
                    }),
                    g = new esri.Graphic;
                g.setGeometry(m),
                    g.setAttributes({
                        id: t
                    });
                var h = new esri.symbol.SimpleFillSymbol;
                0 == u || "0" == u ? h.setStyle(esri.symbol.SimpleLineSymbol.STYLE_NULL) : h.setColor(_utils.hexToRgbObject(p, u));
                var _ = new esri.symbol.SimpleLineSymbol;
                _.setColor(_utils.hexToRgbObject(s, c)),
                isNaN(l) || _.setWidth(l),
                    h.setOutline(_),
                    g.setSymbol(h),
                    d.add(g)
            }
        },
        this.addInternalLayer = function(e, t) {
            if (e) {
                var r = _mapObject.getLayer(e);
                if (r) r.show();
                else {
                    if (e == _31Url && null != t) return void this.addInternalLayerWithProp(e, t, !0);
                    r = _utils.addLayerFun(e, !1, e),
                        r.setOpacity(.6),
                        r.setVisibility(!0)
                }
                e == coverareadistUrl && _mapObject.reorderLayer(coverareadistUrl, 3)
            }
        },
        this.addInternalLayerWithProp = function(e, t, r) {
            if ("" != e && null != e && e.startsWith("http") && (("string" == typeof r && "" == r || null == r) && (r = !0), !_mapObject.getLayer(e))) {
                shownLayerIds.indexOf(e) == -1 && shownLayerIds.push(e);
                var o = new esri.layers.FeatureLayer(e + "/0", {
                    id: e
                });
                if (null != t) {
                    var i = new esri.symbol.SimpleLineSymbol,
                        a = new esri.symbol.SimpleFillSymbol;
                    t.lineStyle && i.setStyle(t.lineStyle),
                        i.setColor(this.hexToRgbObject(t.lineColor, t.lineAlpha)),
                    isNaN(t.lineWidth) || i.setWidth(t.lineWidth),
                        a.setOutline(i),
                        0 == t.alpha || "0" == t.alpha ? a.setStyle("none") : (t.style && a.setStyle(t.style), a.setColor(this.hexToRgbObject(t.color, t.alpha)));
                    var n = new esri.renderer.SimpleRenderer(a);
                    o.setRenderer(n)
                }
                return o.setVisibility(r),
                    _mapObject.addLayer(o),
                    o
            }
        },
        this.addHeatMapLayer = function(e, t, r, o) {
            if (null != t && "" != t && t.startsWith("http")) {
                null != e && "" != e || (e = t),
                ("string" == typeof o && "" == o || null == o) && (o = !0);
                var i = _mapObject.getLayer(e);
                if (!i) {
                    var a = new esri.InfoTemplate("Attributes", "Name: ${NAME}<br>FLOW_0701: ${FLOW_0701}"),
                        n = new esri.layers.FeatureLayer(t, {
                            id: e,
                            mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
                            outFields: ["*"],
                            infoTemplate: a
                        }),
                        l = new esri.renderer.HeatmapRenderer;
                    if (!r.field) return;
                    if (l.setField(r.field), r.colorStops) l.setColorStops(r.colorStops);
                    else {
                        var s = [{
                            ratio: 0,
                            color: "rgba(250, 0, 0, 0)"
                        },
                            {
                                ratio: .15,
                                color: "rgb(0, 0, 255)"
                            },
                            {
                                ratio: .2,
                                color: "rgb(0, 125, 255)"
                            },
                            {
                                ratio: .3,
                                color: "rgb(0, 255, 255)"
                            },
                            {
                                ratio: .4,
                                color: "rgb(125, 255, 255)"
                            },
                            {
                                ratio: .5,
                                color: "rgb(255, 255, 255)"
                            },
                            {
                                ratio: .6,
                                color: "rgb(255, 255, 125)"
                            },
                            {
                                ratio: .7,
                                color: "rgb(255, 255, 0)"
                            },
                            {
                                ratio: .8,
                                color: "rgb(255, 125, 0)"
                            },
                            {
                                ratio: .9,
                                color: "rgb(255, 0, 0)"
                            }];
                        l.setColorStops(s)
                    }
                    return r.blurRadius ? l.setBlurRadius(r.blurRadius) : l.setBlurRadius(8),
                        r.maxPixelIntensity ? l.setMaxPixelIntensity(r.maxPixelIntensity) : l.setMaxPixelIntensity(1e5),
                        r.minPixelIntensity ? l.setMinPixelIntensity(r.minPixelIntensity) : l.setMinPixelIntensity(0),
                        n.setRenderer(l),
                        n.setVisibility(o),
                        _mapObject.addLayer(n),
                        n
                }
                i.show()
            }
        },
        this.addLabel2Map = function(e, t) {
            var r = new Array;
            if (e && !_utils.isArray(e)) e = [e];
            else if (!e || e.length && 0 == e.length) return;
            _utils.moveXY(r, e),
                _utils.moveXY(e, this.convertPoints(e, 17));
            for (var o = 0; o < e.length; o++) {
                var i = new esri.Graphic,
                    a = new esri.geometry.Point(e[o].x, e[o].y, _mapObject.spatialReference);
                i.setGeometry(a),
                    i.setAttributes({
                        id: e[o].id
                    });
                var n = new esri.symbol.TextSymbol(e[o].label);
                n.setColor(_utils.hexToRgbObject(t.color, t.alpha)),
                isNaN(t.fontSize) || n.setFont(new esri.symbol.Font(t.fontSize)),
                isNaN(t.angle) || n.setAngle(t.angle),
                    i.setSymbol(n),
                    mapLabelOverLayer.add(i)
            }
            _utils.moveXY(e, r)
        },
        this.addLayer = function(e, t, r, o) {
            isNaN(r) && (r = 1),
            "false" == t && 0 == t && "true" == t && 1 == t || (t = !0),
            null != o && "" != o || (o = e);
            var i = _mapObject.getLayer(o);
            return i || (i = new esri.layers.ArcGISDynamicMapServiceLayer(e, {
                id: o
            }), i.setVisibility(t), i.setOpacity(r), _mapObject.addLayer(i)),
                i
        },
        this.addLayerFun = function(e, t, r, o, i) {
            var a = _mapObject.getLayer(e);
            if (!a) {
                if (t) a = new BaiduLayer(e),
                    a.attr("id", e);
                else if ("featureLayer" == o) {
                    var n = new Object({
                        id: e
                    });
                    i.outFields && (n.outFields = i.outFields),
                    i.mode && (n.mode = i.mode),
                        a = new esri.layers.FeatureLayer(r, n)
                } else a = r ? new esri.layers.ArcGISDynamicMapServiceLayer(r, {
                    id: e
                }) : new esri.layers.GraphicsLayer({
                    id: e
                });
                _mapObject.addLayer(a)
            }
            return a
        },
        this.addPoint2Map = function(e, t, r) {
            var o = new esri.Graphic,
                i = new esri.geometry.Point(e.x, e.y, _mapObject.spatialReference);
            o.setGeometry(i),
                i.userAttr = new Object;
            for (var a in e)"x" != a && "y" != a && (i.userAttr[a] = e[a]);
            if (e.source) {
                var n = new Image;
                if (n.src = e.source, n.complete) {
                    var l = new esri.symbol.PictureMarkerSymbol(n.src, n.width, n.height);
                    o.setSymbol(l),
                        mapPointOverLayer.add(o)
                } else n.tGraphic = o,
                    n.onload = function() {
                        var e = new esri.symbol.PictureMarkerSymbol(this.src, this.width, this.height);
                        this.tGraphic.setSymbol(e),
                            mapPointOverLayer.add(this.tGraphic)
                    }
            } else {
                var s = new esri.symbol.SimpleMarkerSymbol;
                s.setColor(_utils.hexToRgbObject(t.color, t.alpha)),
                t.style && s.setStyle(t.style),
                isNaN(t.size) || s.setSize(t.size);
                var c = new esri.symbol.SimpleLineSymbol;
                c.setColor(_utils.hexToRgbObject(r.color, r.alpha)),
                r.style && c.setStyle(r.style),
                isNaN(r.width) || c.setWidth(r.width),
                    s.setOutline(c),
                    o.setSymbol(s),
                    mapPointOverLayer.add(o)
            }
        },
        this.addPoints2Map = function(e, t, r) {
            for (var o = 0; o < e.length; o++) {
                var i = e[o];
                if (!isNaN(i.x) && !isNaN(i.y)) {
                    var a = new esri.Graphic;
                    a.setAttributes({
                        newcontent: i.html,
                        id: i.id
                    }),
                    "true" != i.canShowTip && 1 != i.canShowTip || (a.attributes.canShowTip = !0),
                    "true" != i.canDrag && 1 != i.canDrag || (a.attributes.canDrag = !0);
                    var n = new esri.geometry.Point(i.x, i.y, _mapObject.spatialReference);
                    a.setGeometry(n),
                        n.userAttr = new Object;
                    for (var l in i)"x" != l && "y" != l && (n.userAttr[l] = i[l]);
                    if (i.source) {
                        var s = new Image;
                        if (s.src = i.source, s.complete) {
                            var c = new esri.symbol.PictureMarkerSymbol(s.src, s.width, s.height);
                            a.setSymbol(c),
                                mapPointOverLayer.add(a)
                        } else s.tGraphic = a,
                            s.onload = function() {
                                var e = new esri.symbol.PictureMarkerSymbol(this.src, this.width, this.height);
                                this.tGraphic.setSymbol(e),
                                    mapPointOverLayer.add(this.tGraphic)
                            }
                    } else {
                        var p = new esri.symbol.SimpleMarkerSymbol;
                        p.setColor(_utils.hexToRgbObject(t.color, t.alpha)),
                        t.style && p.setStyle(t.style),
                        isNaN(t.size) || p.setSize(t.size);
                        var u = new esri.symbol.SimpleLineSymbol;
                        u.setColor(_utils.hexToRgbObject(r.color, r.alpha)),
                        r.style && u.setStyle(r.style),
                        isNaN(r.width) || u.setWidth(r.width),
                            p.setOutline(u),
                            a.setSymbol(p),
                            mapPointOverLayer.add(a)
                    }
                }
            }
        },
        this.bdPoiClickEvent = function() {
            var e = dojo.attr(this, "poiId"),
                t = "poi_" + e,
                r = Number(dojo.attr(this, "detail")),
                o = dojo.attr(this, "x"),
                i = dojo.attr(this, "y");
            if (1 == r) {
                var a = new Object({
                    poiId: e,
                    scope: 2
                });
                _gis.searchAddress_Detail(a,
                    function(e) {
                        var r = e.result,
                            a = "";
                        r.name && (a += "<p>信息点 : " + r.name + "</p>\n"),
                        r.address && (a += "<p>地址 : " + r.address + "</p>\n"),
                        r.telephone && (a += "<p>电话 : " + r.telephone + "</p>\n"),
                        r.detail_info && (r.detail_info.tag && (a += "<p>标签 : " + r.detail_info.tag + "</p>\n"), r.detail_info.indoor_floor && (a += "<p>所在楼层 : " + r.detail_info.indoor_floor + "</p>\n"), r.detail_info.detail_url && (a += '<p><a href="' + r.detail_info.detail_url + '" target="_blank">详情页面</a></p>\n'));
                        var n = dojo.create("span");
                        dojo.style(n, {
                            display: "block"
                        }),
                            dojo.place(a, n),
                            _gis.showTipOfPointMarker_set(t, n, !0, 300, 300),
                            _gis.setMapCenter({
                                x: o,
                                y: i,
                                type: 12
                            })
                    })
            } else {
                var n = dojo.attr(dojo.query(".result-name", this)[0], "innerHTML");
                _gis.showTipOfPointMarker(t, n, !0),
                    _gis.setMapCenter({
                        x: o,
                        y: i,
                        type: 12
                    })
            }
        },
        this.callbackFuncRun = function(cFunc, param) {
            var ftype = typeof cFunc; ! cFunc || "string" != ftype && "function" != ftype || "" == cFunc || ("string" == ftype ? cFunc.endsWith("()") ? eval(cFunc.substring(0, cFunc.lastIndexOf(")")) + JSON.stringify(param) + ")") : eval(cFunc + "(" + JSON.stringify(param) + ")") : "function" == ftype && cFunc(param))
        },
        this.changeCustRangeMarker = function(e, t, r) {
            var o;
            require([basehttp+"esri/symbols/SimpleMarkerSymbol", basehttp+"esri/symbols/SimpleFillSymbol", basehttp+"esri/symbols/SimpleLineSymbol", basehttp+"esri/renderers/ClassBreaksRenderer", basehttp+"esri/renderers/UniqueValueRenderer", basehttp+"esri/Color"],
                function(i, a, n, l, s, c) {
                    var p = _utils.hexToRgbObject(t.color, t.alpha),
                        u = _utils.hexToRgbObject(t.lineColor, t.lineAlpha);
                    if ("point" == t.layerStyle) {
                        var d = new n;
                        d.setColor(u),
                        isNaN(t.lineWidth) || d.setWidth(t.lineWidth),
                        t.lineStyle && d.setStyle(t.lineStyle);
                        var y = (new i).setColor(p);
                        isNaN(t.size) || y.setSize(t.size),
                        t.style && y.setStyle(t.style),
                            y.setOutline(d),
                        "uniqueValue" == t.render && (o = new s(y, t.filed)),
                        "classBreaks" == t.render && (o = new l(y, t.filed));
                        for (var m = 0; m < r.length; m++) {
                            var g = new i,
                                h = new n;
                            r[m].lineStyle && h.setStyle(r[m].lineStyle),
                                h.setColor(_utils.hexToRgbObject(r[m].lineColor, r[m].lineAlpha)),
                            isNaN(r[m].lineWidth) || h.setWidth(r[m].lineWidth),
                            isNaN(r[m].size) || g.setSize(r[m].size),
                            r[m].style && g.setStyle(r[m].style),
                                g.setColor(_utils.hexToRgbObject(r[m].color, r[m].alpha)),
                                g.setOutline(h),
                            "uniqueValue" == t.render && o.addValue(r[m].value, g),
                            "classBreaks" == t.render && o.addBreak(r[m].minValue, r[m].maxValue, g)
                        }
                    } else if ("polygon" == t.layerStyle) {
                        var _ = new n;
                        _.setColor(u),
                        t.lineStyle && _.setStyle(t.lineStyle),
                        isNaN(t.lineWidth) || _.setWidth(t.lineWidth);
                        var b = new a;
                        0 == t.alpha || "0" == t.alpha ? b.setStyle("none") : (b.setColor(p), t.style && b.setStyle(t.style)),
                            b.setOutline(_),
                        "uniqueValue" == t.render && (o = new s(b, t.filed)),
                        "classBreaks" == t.render && (o = new l(b, t.filed));
                        for (var m = 0; m < r.length; m++) {
                            var v = new a,
                                h = new n;
                            r[m].lineStyle && h.setStyle(r[m].lineStyle),
                                h.setColor(_utils.hexToRgbObject(r[m].lineColor, r[m].lineAlpha)),
                            isNaN(r[m].lineWidth) || h.setWidth(r[m].lineWidth),
                            r[m].style && v.setStyle(r[m].style),
                                0 == r[m].alpha || "0" == r[m].alpha ? v.setStyle("none") : (v.setColor(_utils.hexToRgbObject(r[m].color, r[m].alpha)), v.setOutline(h)),
                            "uniqueValue" == t.render && o.addValue(r[m].value, v),
                            "classBreaks" == t.render && o.addBreak(r[m].minValue, r[m].maxValue, v)
                        }
                    }
                    e.setRenderer(o),
                        e.show(),
                        e.redraw()
                })
        },
        this.convertPoint = function(x, y, type, callFunc) {
            var url = url_prefix + "gisintf/gis/coord/CoordController/coordCorrect.do?token=21218CCA77804D2BA1922C33E0151105",
                point = new Object;
            if (!this.transformPoint) return point.x = Number(x),
                point.y = Number(y),
                point;
            type || (type = 11);
            var sendData = "lngx=" + x + "&lngy=" + y + "&type=" + type;
            return this._gisRequestPost(url, !1, sendData,
                function() {
                    if (4 == _utils._gisXmlHttpRequest.readyState && 200 == _utils._gisXmlHttpRequest.status) {
                        var resData = _utils._gisXmlHttpRequest.responseText,
                            str1 = eval("(" + resData + ")");
                        point.x = str1.x,
                            point.y = str1.y,
                        callFunc && ("function" == typeof callFunc && callFunc(point), "string" == typeof callFunc && eval(callFunc + "(" + resData + ")"))
                    }
                }),
                point
        },
        this.convertPoints = function(points, type, callFunc) {
            var longlatStr = function(e, t) {
                    var r = "";
                    if (e.length > 0) {
                        for (var o = 0; o < e.length; o++) 14 != t && 13 != t || (r += e[o].label ? e[o].label + "," + e[o].x + "," + e[o].y + ";": "_," + e[o].x + "," + e[o].y + ";"),
                            r += e[o].x + "," + e[o].y + ";";
                        r = r.substr(0, r.length - 1)
                    }
                    return r
                } (points, type),
                pointsUrl = url_prefix + "gisintf/gis/coord/CoordController/coordCorrect.do?token=21218CCA77804D2BA1922C33E0151105";
            if (!this.transformPoint) return points;
            type || (type = 17);
            var sendData = "LonLatStr=" + longlatStr + "&type=" + type,
                returnStr = {},
                resData = {};
            return this._gisRequestPost(pointsUrl, !1, sendData,
                function() {
                    4 == _utils._gisXmlHttpRequest.readyState && 200 == _utils._gisXmlHttpRequest.status && (resData = _utils._gisXmlHttpRequest.responseText, returnStr = eval("(" + resData + ")"), callFunc && ("function" == typeof callFunc && callFunc(returnStr.list), "string" == typeof callFunc && eval(callFunc + "(" + JSON.stringify(returnStr.list) + ")")))
                }),
                returnStr && returnStr.list ? returnStr.list: []
        },
        this.createXmlHttpRequest = function() {
            return window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : window.XMLHttpRequest ? new XMLHttpRequest: void 0
        },
        this.createMeasureButton = function() {
            var e = dojo.create("div", {
                    id: "_gis_MeasureWidget"
                }),
                t = dojo.create("a", {
                    innerHTML: "测距"
                });
            dojo.place(t, e),
                dojo.place(e, dojo.byId("_gis_WidgetsContainer"), "last"),
                require([basehttp+"dojo/dom-class", basehttp+"dojo/on"],
                    function(r, o) {
                        r.add(e, "_gis_MeasureWidget"),
                            r.add(t, "_gis_MeasureBtn"),
                            o(t, "click",
                                function() {
                                    _gis.gisToolBar.drawMeasureGraphic()
                                })
                    })
        },
        this.editStyleToLayer = function(e, t, r, o) {
            var i;
            "string" == typeof e ? i = _mapObject.getLayer(e) : "object" == typeof e && e.declaredClass.indexOf("layers") != -1 && (i = e),
            i && (_utils.showMapLoading(), require([basehttp+"esri/symbols/SimpleFillSymbol", basehttp+"esri/symbols/SimpleLineSymbol", basehttp+"esri/symbols/SimpleMarkerSymbol", basehttp+"esri/renderers/SimpleRenderer", basehttp+"esri/Color"],
                function(e, a, n, l, s) {
                    var c = null,
                        p = null;
                    if ("polygon" == r ? (c = new e, p = new a) : "line" == r ? c = new a: (c = new n, p = new a), !isNaN(t.size) && c.setSize && c.setSize(t.size), "polygon" == r && 0 == t.alpha || "0" == t.alpha) c.setStyle("none");
                    else if (t.style && c.setStyle(t.style), 0 == t.color || t.color) {
                        var u;
                        u = "object" == typeof t.color ? t.color: _utils.hexToRgbObject(t.color, t.alpha),
                            c.setColor(u)
                    } else c.setColor(new s([77, 154, 213, t.alpha ? t.alpha: 1]));
                    if (null != p && null != t.lineAttr) {
                        if (isNaN(t.lineAttr.width) || p.setWidth(t.lineAttr.width), t.lineAttr.style && p.setStyle(t.lineAttr.style), 0 == t.lineAttr.color || t.lineAttr.color) {
                            var d;
                            d = "object" == typeof t.lineAttr.color ? t.lineAttr.color: _utils.hexToRgbObject(t.lineAttr.color, t.lineAttr.alpha),
                                p.setColor(d)
                        } else p.setColor(new s([255, 255, 255, t.lineAttr.alpha ? t.lineAttr.alpha: 1]));
                        c.setOutline(p)
                    }
                    var y = new l(c);
                    i.setRenderer(y),
                        i.redraw(),
                    o && _utils.saveRenderer(i.id, t)
                }))
        },
        this.formatPoiData = function(e, t) {
            var r = e.total ? e.total: 0,
                o = 0 == e.status ? "success": "false",
                i = e.results,
                a = new Array;
            e.results[0] && e.results[0].location || (i = []);
            for (var n = 0; n < i.length; n++) a[n] = new Object,
                a[n].formatted_address = i[n].address,
                a[n].name = i[n].name,
                a[n].lng = Number(i[n].location.lng),
                a[n].lat = Number(i[n].location.lat),
                a[n].accurate_type = 1 == i[n].detail ? 0 : 1,
                a[n].uid = i[n].uid,
                a[n].telephone = i[n].telephone;
            0 == r && (r = i.length);
            var l = new Object({
                count: r,
                results: a,
                status: o
            });
            return l
        },
        this.formatPoiData_forBar = function(e, t) {
            var r = e.total ? e.total: 0,
                o = e.status ? e.status: 0,
                i = e.results,
                a = new Array;
            e.results[0] && e.results[0].location || (i = []);
            for (var n = 0; n < i.length; n++) a[n] = new Object,
                a[n].DATATYPE = "百度POI",
                a[n].ID = i[n].uid,
                a[n].LABEL = i[n].name,
                a[n].MAXX = i[n].location.lng,
                a[n].MINY = i[n].location.lat,
                a[n].clickFunc = _utils.bdPoiClickEvent,
                a[n].detail = i[n].detail;
            var l = t ? t + 1 : 1,
                s = new Object({
                    total: r,
                    status: o,
                    page: l,
                    rows: a
                });
            return s
        },
        this.getBDApiData = function(e, t, r) {
            var o = new Object;
            for (var i in t) o[i] = t[i];
            o.output = "json",
                o.ak = "baKTjPT964BlCLU6sf6IgsNohlaiEy7B",
                require([basehttp+"dojo/io/script"],
                    function(t) {
                        var i = {
                            url: e,
                            callbackParamName: "callback",
                            content: o,
                            load: function(e) {
                                r(e)
                            },
                            error: function(e) {
                                console.log(e)
                            }
                        };
                        t.get(i)
                    })
        },
        this.getGisObject = function() {
            return _gis
        },
        this.getInternalLayerUrl = function(e) {
            return "new_100" == e ? covernew100Url: "gsm_td" == e ? covergsmtdUrl: "rxlev" == e ? coverrexlevUrl: "f_pd" == e ? coverfpdUrl: "dist" == e ? coverareadistUrl: "031" == e ? _31Url: "041" == e ? _041Url: "poiYunUrl" == e ? poiYunUrl: "061" == e ? _061Url: "grid" == e ? gridUrl: "_CELL_FLOW_HEAT_heatmap_demo_" == e || "_CELL_FLOW_HEAT_distmap_demo_" == e || "_CELL_FLOW_HEAT_poi_demo_" == e ? url_mapSvr_zj + "CELL_FLOW_HEAT/MapServer": "061_demo_layer" == e ? _061Url: void 0
        },
        this.getRingsByPointAndWH = function(e, t, r, o) {
            for (var i = Number(e), a = Number(t), n = [], l = r / 2, s = o / 2, c = 0; c < 31; c++) {
                var p = i - r / 2 + r / 30 * c;
                n.push([p, a + s * Math.sqrt(1 - (p - i) * (p - i) / (l * l))])
            }
            for (var c = 29; c >= 0; c--) {
                var p = i - r / 2 + r / 30 * c;
                n.push([p, a - s * Math.sqrt(1 - (p - i) * (p - i) / (l * l))])
            }
            return n
        },
        this.getRenderer = function(e) {
            if (e) {
                var t;
                return require([basehttp+"dojo/request/xhr"],
                    function(r) {
                        r("../styledemo/queryStyle.do", {
                            handleAs: "json",
                            data: {
                                layerid: e
                            },
                            method: "POST",
                            sync: !0
                        }).then(function(e) {
                                if (null != e.info.STYLE && "" != e.info.STYLE) {
                                    var r = JSON.parse(e.info.STYLE);
                                    t = r
                                }
                            },
                            function(e) {
                                console.log(e)
                            })
                    }),
                    t
            }
        },
        this.getTwoPointDistanceForWgs84 = function(e, t) {
            var r = Number(e.y),
                o = Number(e.x),
                i = Number(t.y),
                a = Number(t.x);
            if (r == i && o == a) return 0;
            var n, l, s, c, p, u, d, y = getRad((r + i) / 2),
                m = getRad((r - i) / 2),
                g = getRad((o - a) / 2),
                h = Math.sin(m),
                _ = Math.sin(g),
                b = Math.sin(y),
                v = EARTH_RADIUS,
                f = 1 / 298.257;
            return h *= h,
                _ *= _,
                b *= b,
                n = h * (1 - _) + (1 - b) * _,
                l = (1 - h) * (1 - _) + b * _,
                s = Math.atan(Math.sqrt(n / l)),
                c = Math.sqrt(n * l) / s,
                p = 2 * s * v,
                u = (3 * c - 1) / 2 / l,
                d = (3 * c + 1) / 2 / n,
                g = p * (1 + f * (u * b * (1 - h) - d * (1 - b) * h)),
                String(g)
        },
        this.hexToRgbObject = function(e, t) {
            var r, o = !isNaN(t) && t <= 1 && t >= 0 ? t: 1,
                i = 0,
                a = 0,
                n = 0;
            if (isNaN(e) ? "string" == typeof e && e.startsWith("#") && (r = e.substring(1), isNaN(parseInt(r, 16)) && (r = null)) : r = e.toString(16).replace("0x", ""), null == r || r.length > 6) return new esri.Color([i, a, n, o]);
            if (r.length < 6) for (var l = r.length; l < 6; l++) r = "0" + r;
            return i = parseInt(r.substring(0, 2), 16),
                a = parseInt(r.substring(2, 4), 16),
                n = parseInt(r.substring(4, 6), 16),
                new esri.Color([i, a, n, o])
        },
        this.hideLayer = function(e) {
            var t = _mapObject.getLayer(e);
            return !! t && (t.hide(), !0)
        },
        this.hideLoadingUniversal = function(e) {
            var t = dojo.byId(e);
            t && require([basehttp+"dojo/dom-construct"],
                function(e) {
                    e.destroy(t)
                })
        },
        this.hideInfoWindow = function() {
            _mapObject.infoWindow && _mapObject.infoWindow.hide()
        },
        this.infoWindowOpen = function(e) {
            if (e && (e.x && e.y || e.graphic)) {
                var t = _mapObject.infoWindow;
                if (t.clearFeatures(), e.graphic && (t.setFeatures([e.graphic]), t.select(0)), t.resize(e.width, e.height), t.setTitle(e.title), "string" == typeof e.content ? t.setContent('<div style="max-width:' + e.width + 'px;word-break:break-all;text-overflow: ellipsis;overflow-x: hidden;">' + e.content + "</div>") : t.setContent(e.content), e.graphic) t.show(e.graphic.geometry);
                else {
                    var r = new esri.geometry.Point(e.x, e.y, _mapObject.spatialReference);
                    t.show(r)
                }
            }
        },
        this.isArray = function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        },
        this.moveXY = function(e, t) {
            if (this.isArray(e) && this.isArray(t)) {
                for (var r = 0; r < t.length; r++) e[r] || (e[r] = new Object),
                    e[r].x = t[r].x,
                    e[r].y = t[r].y;
                e.length = t.length
            }
        },
        this.parseSingleRing = function(e, t, r) {
            for (var o = _utils.convertPoints(e, t), i = new Array, a = 0; a < o.length; a++) {
                var n = new Array;
                n.push(parseFloat(o[a].x)),
                    n.push(parseFloat(o[a].y)),
                    i.push(n)
            }
            return i
        },
        this.removeLayer = function(e) {
            if (e) {
                if (e.id) {
                    var t = _mapObject.getLayer(e.id);
                    t && _mapObject.removeLayer(e)
                }
                if ("string" == typeof e) {
                    var t = _mapObject.getLayer(e);
                    t && _mapObject.removeLayer(t)
                }
            }
        },
        this.returnError = function(callback) {
            var obj = new Object({
                status: 1,
                message: "参数错误",
                result: [],
                total: 0
            });
            "string" == typeof callback && eval(callback + "(" + JSON.stringify(obj) + ")"),
            "function" == typeof callback && callback(obj)
        },
        this.rgbToHexString = function(e, t, r) {
            if (!isNaN(e) && !isNaN(t) && !isNaN(r)) return ("00000" + (e << 16 | t << 8 | r).toString(16)).slice( - 6)
        },
        this.saveRenderer = function(e, t) {
            var r = JSON.stringify(t);
            require([basehttp+"dojo/request/xhr"],
                function(t) {
                    t("../styledemo/updateStyle.do", {
                        handleAs: "json",
                        data: {
                            layerid: e,
                            style: r
                        },
                        method: "POST",
                        sync: !0
                    }).then(function(e) {
                            "finish" == e.state ? alert("样式修改成功！") : "error" == e.state && alert("样式修改失败！")
                        },
                        function(e) {
                            console.log(e)
                        })
                })
        },
        this.setTransformPoint = function(e) {
            this.transformPoint = e
        },
        this.showLoadingUniversal = function() {
            var e = dojo.byId("mapLoadingStatus");
            e || (e = dojo.create("span", {
                id: "mapLoadingStatus",
                innerHTML: "地图数据加载中...",
                style: {
                    padding: "3px",
                    color: "white",
                    left: "5px",
                    bottom: "5px",
                    zIndex: "100",
                    position: "absolute",
                    backgroundColor: "black",
                    borderRadius: "5px"
                }
            }), dojo.place(e, _gis.divID + "_root", "last")),
                esri.show(e)
        },
        this.showLoadingDiv = function() {
            var e = document.getElementById("loadingStatus");
            console.log(_gis.divID)
            e ? e.style.display = "block": (e = document.createElement("div"), e.setAttribute("id", "loadingStatus"), e.style.left = "50%", e.style.bottom = "50%", e.style.zIndex && (e.style.zIndex = "100"), e.style.position = "absolute", e.innerHTML = '<img src="' + url_image + 'loading-ring.gif">', document.getElementById(_gis.divID).appendChild(e))
        },
        this.showMapLoading = function(e) {
            var t = null,
                r = null;
            e && _utils.showLoadingUniversal(),
                t = dojo.connect(_mapObject, "onUpdateStart",
                    function() {
                        _utils.showLoadingUniversal()
                    }),
                r = dojo.connect(_mapObject, "onUpdateEnd",
                    function() {
                        _utils.hideLoadingUniversal("mapLoadingStatus"),
                            dojo.disconnect(t),
                            dojo.disconnect(r),
                            t = null,
                            r = null
                    })
        },
        this.showSearchAddress = function(e) {
            for (var t, r = e.results,
                     o = new Array,
                     i = 0; i < r.length; i++) t = new Object,
                t.x = r[i].location.lng,
                t.y = r[i].location.lat,
                t.html = "<p>名称：" + r[i].name + "</p><p>详细地址：" + r[i].formatted_address + "</p>",
                t.canShowTip = !0,
                o[i] = new Object,
                o[i] = t;
            var a = new Array;
            _utils.moveXY(a, o),
                _utils.moveXY(o, _utils.convertPoints(o, 17));
            var n = new Object({
                    style: "circle",
                    color: 3030773,
                    size: 20,
                    alpha: 1
                }),
                l = new Object({
                    style: "solid",
                    color: 16777215,
                    width: 1,
                    alpha: 1
                });
            _utils.addPoints2Map(o, n, l),
                _utils.moveXY(o, a)
        },
        this.showSearchPointResult = function(e, t) {
            for (var r, o = e.rows.length,
                     i = e.rows,
                     a = 0; a < o; a++) {
                var r = _utils.convertPoint(i[a].MAXX, i[a].MINY, t);
                r.id = "poi_" + i[a].ID,
                    r.source = url_image + "fav_icon.png",
                    r.html = '<div><p><font color="#ff0000">' + i[a].LABEL + "</font></p></div>",
                    r.canShowTip = !0,
                    _utils.addPoints2Map([r], null, null)
            }
            _gis.getMapLevel() < 12 && _gis.setMapLevel(12),
                dojo.query(".result-body")[0].click()
        },
        this.switchBaseMap = function(e) {
            var t = !1,
                r = function() {
                    _gis_funcWaitFlag ? o() : setTimeout(r, 100)
                },
                o = function() {
                    var r = new BaiduLayer("Vector"),
                        o = new BaiduLayer("Image"),
                        i = new BaiduLayer("POI");
                    t ? (r.setVisibility(!0), o.setVisibility(!1), i.setVisibility(!1)) : (r.setVisibility(!1), o.setVisibility(!0), i.setVisibility(!0)),
                        _mapObject.removeLayer(_gis_BDVector),
                        _mapObject.removeLayer(_gis_BDImage),
                        _mapObject.removeLayer(_gis_BDPoi),
                        _mapObject.addLayer(r, 1),
                        _mapObject.addLayer(o, 2),
                        _mapObject.addLayer(i, 3),
                        _gis_BDVector = r,
                        _gis_BDImage = o,
                        _gis_BDPoi = i,
                        _utils.thCurrentType = e
                };
            "satellite" == e ? t = !1 : (t = !0, "normal" == e ? _init_Gis_BaiduLayer() : _init_Gis_ThematicLayer(null, e)),
                r()
        },
        this.loadCityPanel = function() {}
}
function showSpacial(e) {
    var t = e.MAXX ? e.MAXX: "",
        r = e.MINY ? e.MINY: "",
        o = new esri.geometry.Point(t, r, _mapObject.spatialReference),
        i = new esri.symbol.PictureMarkerSymbol("../image/BuildingView/flat-marker-.png", 16, 24),
        a = new esri.Graphic(o, i);
    a.setAttributes({
        x: t,
        y: r
    }),
        mapSpatialLayer.add(a)
}
function addMeasureServer() {
    require([basehttp+"esri/toolbars/draw"],
        function(e) {
            geometryService = new esri.tasks.GeometryService(url_mapSvrPre + "arcgis/rest/services/Utilities/Geometry/GeometryServer"),
                tb = new e(_mapObject),
                tb.on("draw-end",
                    function(e) {
                        tb.deactivate();
                        var t, r = e.geometry;
                        switch (r.type) {
                            case "point":
                                t = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, 10, new esri.symbol.SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 1), new dojo.Color([0, 255, 0, .25]));
                                break;
                            case "polyline":
                                t = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASH, new dojo.Color([255, 0, 0]), 1);
                                break;
                            case "polygon":
                                t = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NONE, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, .25]))
                        }
                        var o = new esri.Graphic(r, t);
                        mapSpatialLayer.add(o),
                            MeasureGeometry(r),
                            spatialGeometry = r
                    })
        })
}
function MeasureGeometry(e) {
    require([basehttp+"esri/tasks/LengthsParameters",basehttp+ "esri/tasks/AreasAndLengthsParameters"],
        function(t, r) {
            if ("polyline" == e.type) {
                var o = new t;
                o.polylines = [e],
                    o.lengthUnit = esri.tasks.GeometryService.UNIT_METER,
                    o.geodesic = !0,
                    o.polylines[0].spatialReference = new esri.SpatialReference(_mapObject.spatialReference),
                    geometryService.lengths(o)
            } else if ("polygon" == e.type) {
                var i = new r;
                i.lengthUnit = esri.tasks.GeometryService.UNIT_METER,
                    i.areaUnit = esri.tasks.GeometryService.UNIT_SQUARE_METERS,
                    this.outSR = new esri.SpatialReference(_mapObject.spatialReference),
                    geometryService.project([e], this.outSR,
                        function(e) {
                            geometryService.simplify(e,
                                function(e) {
                                    i.polygons = e,
                                        i.polygons[0].spatialReference = new esri.SpatialReference(_mapObject.spatialReference),
                                        geometryService.areasAndLengths(i)
                                })
                        })
            }
        })
}
function outputAreaAndLength(e) {
    var t = new esri.geometry.Point(spatialGeometry.rings[0][0], _mapObject.spatialReference),
        r = e.areas[0] / 1.4256,
        o = parseInt(String(e.lengths[0])) / 1.19432856685505,
        i = "面积： ";
    i = r > 1e6 ? i + (r / 1e6).toFixed(3) + "平方公里； 周长：   ": i + r.toFixed(1) + "平方米；周长：  ",
        i = o > 9999 ? i + (o / 1e3).toFixed(3) + " 千米；": i + o.toFixed(1) + "米；",
        addLabel2Point(t, i)
}
function addLabel2Point(e, t) {
    var r = new esri.Graphic;
    r.setGeometry(e);
    var o = new esri.symbol.Font;
    o.setSize(10);
    var i = new esri.symbol.TextSymbol(t).setColor(new esri.Color([0, 0, 255, 1])).setFont(o);
    i.setOffset(0, -12),
        r.setSymbol(i),
        mapSpatialLayer.add(r)
}
function doBuffer(e) {
    require([basehttp+"dojo/_base/array",basehttp+ "esri/config",basehttp+ "esri/tasks/BufferParameters",basehttp+"esri/tasks/GeometryService", basehttp+"esri/geometry/normalizeUtils"],
        function(e, t, r, o, i) {
            t.defaults.geometryService = new o(url_mapSvrPre + "arcgis/rest/services/Utilities/Geometry/GeometryServer");
            var a = new r;
            a.distances = [1],
                a.outSpatialReference = _mapObject.spatialReference,
                a.unit = o.UNIT_KILOMETER,
                i.normalizeCentralMeridian([spatialGeometry]).then(function(r) {
                    function o(t) {
                        var r = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255, 0, 0, .65]), 2), new dojo.Color([255, 255, 0, .35]));
                        e.forEach(t,
                            function(e) {
                                var t = new esri.Graphic(e, r);
                                mapSpatialLayer.add(t)
                            })
                    }
                    var i = r[0];
                    "polygon" === i.type ? t.defaults.geometryService.simplify([i],
                        function(e) {
                            a.geometries = e,
                                t.defaults.geometryService.buffer(a, o)
                        }) : (a.geometries = [i], t.defaults.geometryService.buffer(a, o))
                })
        })
}
function doCount(e) {
    var t = Math.random();
    window.open("./queryNetByRange/rangeQuery.html?q=" + t + "&&queryFlag=1", "", "height=450px, width=600px,top=20px, left=20px, menubar=no, scrollbars=no, toolbar=no, status=no, location=no")
}
function doSuperCount(e) {
    var t = Math.random();
    window.open("./queryNetByRange/rangeQuery.html?q=" + t + "&&queryFlag=2", "", "height=450px, width=600px,top=20px, left=20px, menubar=no, scrollbars=no, toolbar=no, status=no, location=no")
}
function doMost(e) {}
function pints2poly(e) {
    for (var t = "",
             r = 0; r < e.length; r++) t = linejson + "[" + e[r].x + "," + e[r].y + "],";
    return t = t.Substring(0, t.Length - 1)
}
function segmentsIntr(e, t, r, o) {
    var i = (e.x - r.x) * (t.y - r.y) - (e.y - r.y) * (t.x - r.x),
        a = (e.x - o.x) * (t.y - o.y) - (e.y - o.y) * (t.x - o.x);
    if (i * a >= 0) return ! 1;
    var n = (r.x - e.x) * (o.y - e.y) - (r.y - e.y) * (o.x - e.x),
        l = n + i - a;
    if (n * l >= 0) return ! 1;
    var s = n / (a - i),
        c = s * (t.x - e.x),
        p = s * (t.y - e.y);
    return {
        x: e.x + c,
        y: e.y + p
    }
}
function doCoord(e) {
    var t;
    return CoordPost(e,
        function() {
            4 == xmlHttpRequest.readyState && 200 == xmlHttpRequest.status && (t = xmlHttpRequest.responseText)
        }),
        t
}
function CoordPost(data, callBackFun) {
    var url = url_prefix + "gisManager/satnav/coord.do";
    xmlHttpRequest = _utils.createXmlHttpRequest(),
        xmlHttpRequest.onreadystatechange = eval(callBackFun),
        xmlHttpRequest.open("POST", url, !1),
        xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8"),
        xmlHttpRequest.send("points=" + data)
}
function callbackf(e) {
    if (!e.result.routes[0]) return void alert("坐标超出范围");
    for (var t = e.result.routes[0].steps, r = 0; r < t.length; r++) for (var o = 0; o < t[r].length; o++) {
        for (var i = t[r][o].path + "", a = doCoord(i), n = a.split(";"), l = [], s = 0; s < n.length; s++) {
            var c = n[s].split(",")[0],
                p = n[s].split(",")[1];
            if (0 == s) {
                var u = new esri.geometry.Point(c, p, _mapObject.spatialReference),
                    d = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 5, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 255, 255]), 4), new dojo.Color([250, 139, 46])),
                    y = new esri.Graphic;
                y.setGeometry(u),
                    y.setSymbol(d),
                    mapSatnavLayer.add(y)
            }
            var m = [n[s].split(",")[0], n[s].split(",")[1]];
            l.push(m)
        }
        var g = new esri.geometry.Polyline({
                paths: [l],
                spatialReference: _mapObject.spatialReference
            }),
            h = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, "#0000FF", 3),
            _ = new esri.Graphic;
        _.setGeometry(g),
            _.setSymbol(h);
        var b = new esri.InfoTemplate;
        b.setContent("导航建议：" + t[r][o].instructions + ";耗时：" + parseInt(t[r][o].duration / 60) + "min"),
            _.setInfoTemplate(b),
            mapSatnavLayer.add(_)
    }
}
function coordPointwgs2bdmc(e) {
    var t = [];
    try {
        var r = e.split(",");
        if (r.length > 1) {
            var o = _utils.convertPoint(Number(r[0]), Number(r[1]));
            t = [Number(o.x), Number(o.y)]
        }
    } catch(i) {}
    return t
}
function coordPointswgs2bdmc(e) {
    for (var t = [], r = e.split(";"), o = 0; o < r.length; o++) {
        var i = coordPointwgs2bdmc(r[o]);
        t.push(i)
    }
    return t
}
function doclick(e) {
    function t(e, t, o, i) {
        var a = "http://api.map.baidu.com/panorama/v2?ak=nv89hhhaRpvdtk4HojFMM8NLUAhCMMVm&width=350&height=250&fov=180&location=";
        a += e + "," + t;
        var n = new Image;
        n.src = a,
            n.CurPos = o,
            n.clickPoint = i,
            n.title = "全景图片",
            n.complete ? r(this.CurPos, 370, 270, this, this.title, this.clickPoint) : (n.onload = function() {
                r(this.CurPos, 370, 270, this, this.title, this.clickPoint)
            },
                n.onerror = function() {
                    var e = '<h5 style="color:red">未找到全景图</h5>';
                    r(this.CurPos, 200, 100, e, this.title, this.clickPoint)
                })
    }
    function r(e, t, r, o, i, a) {
        mapSpatialLayer.clear(),
            mapSpatialLayer.add(a);
        var n = new Object({
            width: t,
            height: r,
            title: i,
            content: o,
            graphic: a
        });
        _utils.infoWindowOpen(n),
            _utils.hideLoadingUniversal("mapLoadingStatus")
    }
    _utils.showLoadingUniversal();
    var o = e.mapPoint.x / 1.19432856685505,
        i = e.mapPoint.y / 1.19432856685505,
        a = "http://api.map.baidu.com/geoconv/v1/?ak=nv89hhhaRpvdtk4HojFMM8NLUAhCMMVm&from=6&to=5&coords=" + o + "," + i,
        n = {
            url: a,
            callbackParamName: "callback",
            load: function(r) {
                if (0 == r.status) {
                    var o = parseFloat(r.result[0].x.toFixed(6)),
                        i = parseFloat(r.result[0].y.toFixed(6)),
                        a = new esri.geometry.Point(e.mapPoint.x, e.mapPoint.y, _mapObject.spatialReference),
                        n = new esri.symbol.PictureMarkerSymbol(url_image + "fav_icon.png", 16, 24),
                        l = new esri.Graphic(a, n);
                    t(o, i, l.geometry, l)
                }
            },
            error: function(e) {
                console.log("An unexpected error occurred: " + e)
            }
        };
    dojo.io.script.get(n)
}
function addMsPointsServer(e) {
    require([basehttp+"esri/toolbars/draw"],
        function(t) {
            geometryService = new esri.tasks.GeometryService(url_mapSvrPre + "arcgis/rest/services/Utilities/Geometry/GeometryServer"),
                tb = new t(_mapObject),
                tb.activate(esri.toolbars.Draw.POLYGON),
                tb.on("draw-end",
                    function(t) {
                        tb.deactivate();
                        var r = t.geometry,
                            o = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NONE, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, .25])),
                            i = new esri.Graphic(r, o);
                        mapSpatialLayer.add(i),
                            doReturnGeometry(r, e)
                    })
        })
}
function doReturnGeometry(e, t) {
    for (var r = 1.19432856685505,
             o = e.rings[0].toString(), i = o.split(","), a = "", n = 0; n < i.length; n++) a = a + Number(i[n]) / r + "," + Number(i[n + 1]) / r + ";",
        n++;
    a = a.substring(0, a.length - 1);
    var l = "http://api.map.baidu.com/geoconv/v1/?ak=nv89hhhaRpvdtk4HojFMM8NLUAhCMMVm",
        s = {
            url: l,
            callbackParamName: "callback",
            content: {
                from: 6,
                to: 5,
                coords: a
            },
            load: function(e) {
                0 == e.status && t(e.result)
            },
            error: function(e) {
                console.log("An unexpected error occurred: " + e)
            }
        };
    dojo.io.script.get(s)
}
function addMsAreaServer() {
    require([basehttp+"esri/toolbars/draw"],
        function(e) {
            geometryService = new esri.tasks.GeometryService(url_mapSvrPre + "arcgis/rest/services/Utilities/Geometry/GeometryServer"),
                tb = new e(_mapObject),
                tb.activate(esri.toolbars.Draw.POLYGON),
                tb.on("draw-end",
                    function(e) {
                        tb.deactivate();
                        var t = e.geometry,
                            r = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NONE, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, .25])),
                            o = new esri.Graphic(t, r);
                        mapSpatialLayer.add(o),
                            MeasureGeometry(t),
                            spatialGeometry = t
                    }),
            handler && (handler = dojo.disconnect(handler)),
                tb.activate(esri.toolbars.Draw.POLYGON),
                handler = dojo.connect(geometryService, "onAreasAndLengthsComplete", doAreaAndLength)
        })
}
function doAreaAndLength(e) {
    outputAreaAndLength(e)
}
function addMsBufferServer(e) {
    require([basehttp+"esri/toolbars/draw"],
        function(t) {
            geometryService = new esri.tasks.GeometryService(url_mapSvrPre + "arcgis/rest/services/Utilities/Geometry/GeometryServer"),
                tb = new t(_mapObject),
                tb.activate(esri.toolbars.Draw.POLYGON),
                tb.on("draw-end",
                    function(t) {
                        tb.deactivate();
                        var r = t.geometry,
                            o = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NONE, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, .25])),
                            i = new esri.Graphic(r, o);
                        mapSpatialLayer.add(i),
                            doBufferGeometry(r, e)
                    })
        })
}
function doBufferGeometry(e, t) {
    require([basehttp+"dojo/_base/array", basehttp+"esri/config", basehttp+"esri/tasks/BufferParameters", basehttp+"esri/tasks/GeometryService", basehttp+"esri/geometry/normalizeUtils"],
        function(r, o, i, a, n) {
            o.defaults.geometryService = new a(url_mapSvrPre + "arcgis/rest/services/Utilities/Geometry/GeometryServer");
            var l = new i;
            l.distances = [t],
                l.outSpatialReference = _mapObject.spatialReference,
                l.unit = a.UNIT_KILOMETER,
                n.normalizeCentralMeridian([e]).then(function(e) {
                    function t(e) {
                        var t = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255, 0, 0, .65]), 2), new dojo.Color([255, 255, 0, .35]));
                        r.forEach(e,
                            function(e) {
                                var r = new esri.Graphic(e, t);
                                mapSpatialLayer.add(r)
                            })
                    }
                    var i = e[0];
                    "polygon" === i.type ? o.defaults.geometryService.simplify([i],
                        function(e) {
                            l.geometries = e,
                                o.defaults.geometryService.buffer(l, t)
                        }) : (l.geometries = [i], o.defaults.geometryService.buffer(l, t))
                })
        })
}
function AddMsCircleServer(e, t, r) {
    var o = _utils.convertPoint(e.x, e.y);
    require([basehttp+"esri/units", basehttp+"esri/geometry/Circle",basehttp+ "dojo/dom"],
        function(e, i, a) {
            function n(e) {
                function t(e) {
                    for (var t, r = e.features,
                             i = [], a = 0; a < r.length; a++) t = r[a],
                    u.contains(t.geometry) && i.push(t.attributes.UUID);
                    var n = new esri.tasks.Query;
                    n.geometry = u,
                        o.selectFeatures(n, esri.layers.FeatureLayer.SELECTION_NEW,
                            function(e) {
                                for (var t = e.length,
                                         r = 0; r < t; r++) {
                                    var o = new esri.InfoTemplate;
                                    o.setContent("OBJECTID:" + e[r].attributes.OBJECTID),
                                        e[r].setInfoTemplate(o)
                                }
                            })
                }
                var o = new esri.layers.FeatureLayer(r + "/0", {
                        id: "demodata"
                    }),
                    i = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 12, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_NULL, new dojo.Color([247, 34, 101, .9]), 1), new dojo.Color([207, 34, 171, .5]));
                o.setSelectionSymbol(i);
                var a = (new esri.symbol.SimpleMarkerSymbol).setSize(0);
                o.setRenderer(new esri.renderer.SimpleRenderer(a)),
                    _mapObject.addLayer(o);
                var n = new esri.tasks.Query;
                n.geometry = u.getExtent(),
                    o.queryFeatures(n, t)
            }
            var l = new esri.geometry.Point(o.x, o.y, _mapObject.spatialReference),
                s = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 5, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 255, 255]), 4), new dojo.Color([250, 139, 46])),
                c = new esri.Graphic;
            c.setGeometry(l),
                c.setSymbol(s),
                mapSpatialLayer.add(c);
            var p = new esri.geometry.Point(o.x, o.y, _mapObject.spatialReference),
                u = new i({
                    center: p,
                    geodesic: !0,
                    radius: t,
                    radiusUnit: e.KILOMETERS
                }),
                d = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, .25])),
                y = new esri.Graphic;
            y.setGeometry(u),
                y.setSymbol(d),
                mapSpatialLayer.add(y),
                n(u)
        })
}
function doPolymerization(e) {
    require([basehttp+"dojo/parser", basehttp+"dojo/ready", basehttp+"dojo/_base/array", basehttp+"esri/Color", basehttp+"dojo/dom-style", basehttp+"dojo/query", basehttp+"esri/map", basehttp+"esri/request",basehttp+ "esri/graphic", basehttp+"esri/geometry/Extent", basehttp+"esri/tasks/query", basehttp+"esri/tasks/QueryTask", basehttp+"esri/symbols/SimpleMarkerSymbol", basehttp+"esri/symbols/SimpleFillSymbol", basehttp+"esri/symbols/PictureMarkerSymbol", basehttp+"esri/renderers/ClassBreaksRenderer", basehttp+"esri/layers/GraphicsLayer", basehttp+"esri/dijit/PopupTemplate", basehttp+"esri/geometry/Point", basehttp+"esri/config",basehttp+ "extras/ClusterLayer", basehttp+"esri/symbols/SimpleMarkerSymbol",basehttp+ "dijit/layout/BorderContainer", basehttp+"dijit/layout/ContentPane",basehttp+ "dojo/domReady!"],
        function(t, r, o, i, a, n, l, s, c, p, u, d, y, m, g, h, _, b, v, f, L) {
            function S(e) {
                var t = {};
                t.data = o.map(e,
                    function(e) {
                        var t = {
                            "名称": e.name,
                            showCount: 1
                        };
                        return {
                            x: parseFloat(e.lat),
                            y: parseFloat(e.lng),
                            attributes: t
                        }
                    }),
                    clusterLayer = new L({
                        data: t.data,
                        distance: 100,
                        id: "clusters",
                        labelColor: "#fff",
                        labelOffset: -5,
                        resolution: _mapObject.extent.getWidth() / _mapObject.width,
                        singleColor: "#888"
                    });
                var r = (new y).setSize(8),
                    i = new h(r, "clusterCount");
                i.addBreak(0, 9, new y(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 30, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 255, 255]), 2), new dojo.Color([250, 139, 46]))),
                    i.addBreak(10, 99, new y(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 50, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 255, 255]), 4), new dojo.Color([250, 139, 46]))),
                    i.addBreak(100, 999, new y(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 80, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 255, 255]), 6), new dojo.Color([250, 139, 46]))),
                    i.addBreak(1e3, 9999, new y(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 100, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 255, 255]), 10), new dojo.Color([250, 139, 46]))),
                    i.addBreak(1e4, 99999, new y(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 120, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 255, 255]), 10), new dojo.Color([250, 139, 46]))),
                    i.addBreak(1e5, 999999, new y(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 140, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 255, 255]), 14), new dojo.Color([250, 139, 46]))),
                    i.addBreak(1e6, 99999999, new y(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 170, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 255, 255]), 16), new dojo.Color([250, 139, 46]))),
                    clusterLayer.setRenderer(i),
                    clusterLayer.setVisibility(!0),
                    _mapObject.addLayer(clusterLayer)
            }
            function w(e) {
                console.log("something failed: ", e)
            }
            var j = s({
                url: e,
                handleAs: "json"
            });
            j.then(S, w)
        })
}
var _mapObject, url_prefix = "http://zjgis.zj.chinamobile.com/",
    url_mapSvrPre = url_prefix,
    url_mapSvr_zj = url_prefix + "arcgis/rest/services/ZJ/",
    resource_pro = "gis/",
    url_image = url_prefix + resource_pro + "image/",
    bd_api2 = url_prefix,
    bd_online1 = url_prefix,
    bd_shangetu2 = url_prefix,
    bd_api_place = url_prefix + "place/v2/",
    bd_api_geocoder = url_prefix + "geocoder/v2/",
    bd_api_direction = url_prefix + "direction/v2/",
    coverareadistUrl = url_mapSvr_zj + "COVER_AREA_DIST/MapServer",
    coverfpdUrl = url_mapSvr_zj + "COVER_AREA_NEWDATA_FPD/MapServer",
    covergsmtdUrl = url_mapSvr_zj + "COVER_AREA_NEWDATA_GSM_TD/MapServer",
    covernew100Url = url_mapSvr_zj + "COVER_AREA_NEWDATA_NEW_100/MapServer",
    coverrexlevUrl = url_mapSvr_zj + "COVER_AREA_NEWDATA_RXLEV/MapServer",
    _061Url = url_mapSvr_zj + "COVER_AREA_NEWDATA_061/MapServer",
    _31Url = url_mapSvr_zj + "COVER_AREA_NEWDATA_31/MapServer",
    _041Url = url_mapSvr_zj + "COVER_AREA_NEWDATA_041/MapServer",
    _testDemo = url_mapSvr_zj + "YGDATA/MapServer",
    gridUrl = url_mapSvr_zj + "NET_GRID/MapServer",
    poiYunUrl = url_mapSvr_zj + "NET_POI/MapServer",
    _gis_BDVector = null,
    _gis_BDImage = null,
    _gis_BDPoi = null,
    mapEllipseLayer = null,
    mapGraphicLayer = null,
    mapGridLayer = null,
    mapLabelOverLayer = null,
    mapLineOverLayer = null,
    mapMiniGridLayer = null,
    mapPointOverLayer = null,
    mapPolygonOverLayer = null,
    mapSpatialLayer = null,
    mapSatnavLayer = null,
    _utils = null,
    _gis_funcWaitFlag = !1,
    _gis_mapWaitFlag = !1,
    businessLayerManager = 0,
    geometryService = null,
    EARTH_RADIUS = 6378137,
    PI = Math.PI; !
    function() {
        "object" != typeof JSON && (JSON = {}),
            function() {
                "use strict";
                function f(e) {
                    return e < 10 ? "0" + e: e
                }
                function this_value() {
                    return this.valueOf()
                }
                function quote(e) {
                    return rx_escapable.lastIndex = 0,
                        rx_escapable.test(e) ? '"' + e.replace(rx_escapable,
                            function(e) {
                                var t = meta[e];
                                return "string" == typeof t ? t: "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice( - 4)
                            }) + '"': '"' + e + '"'
                }
                function str(e, t) {
                    var r, o, i, a, n, l = gap,
                        s = t[e];
                    switch (s && "object" == typeof s && "function" == typeof s.toJSON && (s = s.toJSON(e)), "function" == typeof rep && (s = rep.call(t, e, s)), typeof s) {
                        case "string":
                            return quote(s);
                        case "number":
                            return isFinite(s) ? String(s) : "null";
                        case "boolean":
                        case "null":
                            return String(s);
                        case "object":
                            if (!s) return "null";
                            if (gap += indent, n = [], "[object Array]" === Object.prototype.toString.apply(s)) {
                                for (a = s.length, r = 0; r < a; r += 1) n[r] = str(r, s) || "null";
                                return i = 0 === n.length ? "[]": gap ? "[\n" + gap + n.join(",\n" + gap) + "\n" + l + "]": "[" + n.join(",") + "]",
                                    gap = l,
                                    i
                            }
                            if (rep && "object" == typeof rep) for (a = rep.length, r = 0; r < a; r += 1)"string" == typeof rep[r] && (o = rep[r], i = str(o, s), i && n.push(quote(o) + (gap ? ": ": ":") + i));
                            else for (o in s) Object.prototype.hasOwnProperty.call(s, o) && (i = str(o, s), i && n.push(quote(o) + (gap ? ": ": ":") + i));
                            return i = 0 === n.length ? "{}": gap ? "{\n" + gap + n.join(",\n" + gap) + "\n" + l + "}": "{" + n.join(",") + "}",
                                gap = l,
                                i
                    }
                }
                var rx_one = /^[\],:{}\s]*$/,
                    rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                    rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                    rx_four = /(?:^|:|,)(?:\s*\[)+/g,
                    rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                    rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
                "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
                    return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z": null
                },
                    Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value, String.prototype.toJSON = this_value);
                var gap, indent, meta, rep;
                "function" != typeof JSON.stringify && (meta = {
                    "\b": "\\b",
                    "\t": "\\t",
                    "\n": "\\n",
                    "\f": "\\f",
                    "\r": "\\r",
                    '"': '\\"',
                    "\\": "\\\\"
                },
                    JSON.stringify = function(e, t, r) {
                        var o;
                        if (gap = "", indent = "", "number" == typeof r) for (o = 0; o < r; o += 1) indent += " ";
                        else "string" == typeof r && (indent = r);
                        if (rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length)) throw new Error("JSON.stringify");
                        return str("", {
                            "": e
                        })
                    }),
                "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
                    function walk(e, t) {
                        var r, o, i = e[t];
                        if (i && "object" == typeof i) for (r in i) Object.prototype.hasOwnProperty.call(i, r) && (o = walk(i, r), void 0 !== o ? i[r] = o: delete i[r]);
                        return reviver.call(e, t, i)
                    }
                    var j;
                    if (text = String(text), rx_dangerous.lastIndex = 0, rx_dangerous.test(text) && (text = text.replace(rx_dangerous,
                            function(e) {
                                return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice( - 4)
                            })), rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) return j = eval("(" + text + ")"),
                        "function" == typeof reviver ? walk({
                                "": j
                            },
                            "") : j;
                    throw new SyntaxError("JSON.parse")
                })
            } (),
            Array.prototype.indexOf = function(e) {
                for (var t = 0; t < this.length; t++) if (this[t] == e) return t;
                return - 1
            },
            Array.prototype.remove = function(e) {
                if (isNaN(e) || e > this.length) return ! 1;
                for (var t = 0,
                         r = 0; t < this.length; t++) this[t] != this[e] && (this[r++] = this[t]);
                this.length -= 1
            },
        String.prototype.startsWith || (String.prototype.startsWith = function(e, t) {
            return t = t || 0,
            this.substr(t, e.length) === e
        }),
        String.prototype.endsWith || (String.prototype.endsWith = function(e, t) {
            var r = this.toString(); ("number" != typeof t || !isFinite(t) || Math.floor(t) !== t || t > r.length) && (t = r.length),
                t -= e.length;
            var o = r.lastIndexOf(e, t);
            return o !== -1 && o === t
        })
    } (),
    Gis.prototype = {
        addEcllipse: function(e) {
            _utils.addEcllipseFun(e)
        },
        addEcllipseByBatch: function(e) {
            if (e && e.length > 0) for (var t = 0; t < e.length; t++) _utils.addEcllipseFun(e[t])
        },
        addLabelMarkers: function(e, t) {
            _utils.addLabel2Map(e, t)
        },
        addMapEventListener: function(e, t) {
            mapClickEvent = dojo.connect(_mapObject, "onClick",
                function(r) {
                    if ("MapEvent_MapClick" == e) {
                        var o = _utils.convertPoint(r.mapPoint.x, r.mapPoint.y, 16),
                            i = new Object;
                        i.x = Number(o.x),
                            i.y = Number(o.y),
                            i.mapEventType = e,
                            _utils.callbackFuncRun(t, i)
                    }
                }),
                mapDBClickEvent = dojo.connect(_mapObject, "onDblClick",
                    function(r) {
                        if ("MapEvent_MapDBClick" == e) {
                            var o = new Object,
                                i = _utils.convertPoint(r.mapPoint.x, r.mapPoint.y, 16);
                            o.x = Number(i.x),
                                o.y = Number(i.y),
                                o.mapEventType = e,
                                _utils.callbackFuncRun(t, o)
                        }
                    }),
                mapExtentChangeEvent = dojo.connect(_mapObject, "onExtentChange",
                    function(r) {
                        if ("MapEvent_ExtentChange" == e) {
                            var o = new Object,
                                i = [];
                            i[0] = new Object({
                                x: r.xmin,
                                y: r.ymin
                            }),
                                i[1] = new Object({
                                    x: r.xmax,
                                    y: r.ymax
                                });
                            var a = _utils.convertPoints(i, 19);
                            o.xmin = Number(a[0].x),
                                o.ymin = Number(a[0].y),
                                o.xmax = Number(a[1].x),
                                o.ymax = Number(a[1].y),
                                o.mapEventType = e,
                                o.level = _mapObject.getLevel(),
                                _utils.callbackFuncRun(t, o)
                        }
                    }),
                mapMouseMoveEvent = dojo.connect(_mapObject, "onMouseMove",
                    function(r) {
                        if ("MapEvent_MapMouseMove" == e) {
                            var o = new Object,
                                i = _utils.convertPoint(r.mapPoint.x, r.mapPoint.y, 16);
                            o.x = Number(i.x),
                                o.y = Number(i.y),
                                o.mapEventType = e,
                                _utils.callbackFuncRun(t, o)
                        }
                    }),
                mapOnloadEvent = dojo.connect(_mapObject, "onLoad",
                    function(r) {
                        if ("MapEvent_MapLoad" == e) {
                            var o = new Object;
                            o.map = r,
                                o.mapEventType = e,
                                _utils.callbackFuncRun(t, o)
                        }
                    }),
                pointMarkClickEvent = dojo.connect(mapPointOverLayer, "onClick",
                    function(r) {
                        if ("MapEvent_PointMarkerClick" == e) {
                            var o = r.graphic.geometry,
                                i = r.graphic.symbol,
                                a = new Object;
                            i.url ? (a.height = i.height, a.width = i.width, a.source = i.url) : (a.color = i.color, "object" == typeof a.color && (a.color = "0x" + _utils.rgbToHexString(a.color.r, a.color.g, a.color.b), a.color = Number(a.color), a.alpha = i.color.a), "string" == typeof a.color && a.color.startsWith("#") && (a.color = a.color.replace("#", "0x"), a.color = Number(a.color)), a.outline = new Object, "object" == typeof i.outline.color && (a.outline.color = "0x" + _utils.rgbToHexString(i.outline.color.r, i.outline.color.g, i.outline.color.b), a.outline.color = Number(a.outline.color), a.outline.alpha = i.outline.color.a), "string" == typeof i.outline.color && i.outline.color.startsWith("#") && (a.outline.color = i.outline.color.replace("#", "0x"), a.outline.color = Number(a.outline.color)), (i.size || 0 == i.size) && (a.size = i.size), i.style && (a.style = i.style), (i.alpha || 0 == i.alpha) && (a.alpha = i.alpha), (i.outline.alpha || 0 == i.outline.alpha) && (a.outline.alpha = i.outline.alpha), i.outline.style && (a.outline.style = i.outline.style), (i.outline.width || 0 == i.outline.width) && (a.outline.width = i.outline.width)),
                                a.html = r.graphic.attributes.newcontent,
                                a.type = o.type;
                            for (var n in o.userAttr) a[n] = o.userAttr[n];
                            var l = (new esri.geometry.Point(r.graphic.geometry.x, r.graphic.geometry.y, _mapObject.spatialReference), _utils.convertPoint(o.x, o.y, 16));
                            a.x = Number(l.x),
                                a.y = Number(l.y),
                                a.mapEventType = e,
                                a.id = r.graphic.attributes.id,
                                _utils.callbackFuncRun(t, a)
                        }
                    }),
                pointMarkDBClickEvent = dojo.connect(mapPointOverLayer, "onDblClick",
                    function(r) {
                        if ("MapEvent_PointMarkerDbClick" == e) {
                            r.stopPropagation();
                            var o = r.graphic.geometry,
                                i = r.graphic.symbol,
                                a = new Object,
                                n = new esri.geometry.Point(o.x, o.y, _mapObject.spatialReference);
                            _mapObject.setZoom(_mapObject.getZoom() + 1),
                                _mapObject.centerAt(n),
                                i.url ? (a.height = i.height, a.width = i.width, a.source = i.url) : (a.color = i.color, "object" == typeof a.color && (a.color = "0x" + _utils.rgbToHexString(a.color.r, a.color.g, a.color.b), a.color = Number(a.color), a.alpha = i.color.a), "string" == typeof a.color && a.color.startsWith("#") && (a.color = a.color.replace("#", "0x"), a.color = Number(a.color)), a.outline = new Object, "object" == typeof i.outline.color && (a.outline.color = "0x" + _utils.rgbToHexString(i.outline.color.r, i.outline.color.g, i.outline.color.b), a.outline.color = Number(a.outline.color), a.outline.alpha = i.outline.color.a), "string" == typeof i.outline.color && i.outline.color.startsWith("#") && (a.outline.color = i.outline.color.replace("#", "0x"), a.outline.color = Number(a.outline.color)), (i.size || 0 == i.size) && (a.size = i.size), i.style && (a.style = i.style), (i.alpha || 0 == i.alpha) && (a.alpha = i.alpha), (i.outline.alpha || 0 == i.outline.alpha) && (a.outline.alpha = i.outline.alpha), i.outline.style && (a.outline.style = i.outline.style), (i.outline.width || 0 == i.outline.width) && (a.outline.width = i.outline.width)),
                                a.html = r.graphic.attributes.newcontent,
                                a.type = o.type;
                            for (var l in o.userAttr) a[l] = o.userAttr[l];
                            var s = _utils.convertPoint(o.x, o.y, 16);
                            a.x = Number(s.x),
                                a.y = Number(s.y),
                                a.mapEventType = e,
                                a.id = r.graphic.attributes.id,
                                _utils.callbackFuncRun(t, a)
                        }
                    }),
                polygonDBClickEvent = dojo.connect(mapPolygonOverLayer, "onDblClick",
                    function(r) {
                        if ("MapEvent_PolygonDbClick" == e) {
                            r.stopPropagation();
                            var o = r.graphic.geometry,
                                i = (r.graphic.symbol, new Object),
                                a = new esri.geometry.Point(r.mapPoint.x, r.mapPoint.y, _mapObject.spatialReference);
                            _mapObject.setZoom(_mapObject.getZoom() + 1),
                                _mapObject.centerAt(a),
                                i.type = o.type,
                                i.alpha = o.userAttr.alpha,
                                i.style = o.userAttr.style,
                                i.color = o.userAttr.color,
                                i.lineAlpha = o.userAttr.lineAlpha,
                                i.lineColor = o.userAttr.lineColor,
                                i.lineWidth = o.userAttr.lineWidth,
                                i.lineStyle = o.userAttr.lineStyle;
                            for (var n = o.rings,
                                     l = [], s = 0; s < n.length; s++) {
                                l[s] = new Array;
                                for (var c = 0; c < n[s].length; c++) l[s][c] = new Object({
                                    x: n[s][c][0],
                                    y: n[s][c][1]
                                })
                            }
                            i.rings = new Array;
                            for (var s = 0; s < l.length; s++) {
                                var p = _utils.convertPoints(l[s], 19);
                                i.rings[s] = new Array;
                                for (var u = new Array,
                                         c = 0; c < p.length; c++) u[c] = new Array,
                                    u[c].push(p[c].x),
                                    u[c].push(p[c].y);
                                i.rings[s] = u
                            }
                            var d = _utils.convertPoint(r.mapPoint.x, r.mapPoint.y, 16);
                            i.x = Number(d.x),
                                i.y = Number(d.y),
                                i.mapEventType = e,
                                i.id = r.graphic.attributes.id,
                                _utils.callbackFuncRun(t, i)
                        }
                    }),
                polygonClickEvent = dojo.connect(mapPolygonOverLayer, "onClick",
                    function(r) {
                        if ("MapEvent_PolygonClick" == e) {
                            r.stopPropagation();
                            var o = r.graphic.geometry,
                                i = (r.graphic.symbol, new Object);
                            i.type = o.type,
                                i.alpha = o.userAttr.alpha,
                                i.style = o.userAttr.style,
                                i.color = o.userAttr.color,
                                i.lineAlpha = o.userAttr.lineAlpha,
                                i.lineColor = o.userAttr.lineColor,
                                i.lineWidth = o.userAttr.lineWidth,
                                i.lineStyle = o.userAttr.lineStyle;
                            for (var a = o.rings,
                                     n = [], l = 0; l < a.length; l++) {
                                n[l] = new Array;
                                for (var s = 0; s < a[l].length; s++) n[l][s] = new Object({
                                    x: Number(a[l][s][0]),
                                    y: Number(a[l][s][1])
                                })
                            }
                            i.rings = new Array;
                            for (var l = 0; l < n.length; l++) {
                                var c = _utils.convertPoints(n[l], 19);
                                i.rings[l] = new Array;
                                for (var p = new Array,
                                         s = 0; s < c.length; s++) p[s] = new Array,
                                    p[s].push(Number(c[s].x)),
                                    p[s].push(Number(c[s].y));
                                i.rings[l] = p
                            }
                            var u = _utils.convertPoint(r.mapPoint.x, r.mapPoint.y, 16);
                            i.x = Number(u.x),
                                i.y = Number(u.y),
                                i.mapEventType = e,
                                i.id = r.graphic.attributes.id,
                                _utils.callbackFuncRun(t, i)
                        }
                    }),
                polylineClickEvent = dojo.connect(mapLineOverLayer, "onClick",
                    function(r) {
                        if ("MapEvent_PolyLineClick" == e) {
                            r.stopPropagation();
                            var o = new Object,
                                i = (r.graphic.symbol, r.graphic.geometry);
                            o.alpha = i.userAttr.alpha,
                                o.color = i.userAttr.color,
                                o.width = i.userAttr.width,
                                o.style = i.userAttr.style;
                            for (var a = i.paths,
                                     n = [], l = 0; l < a.length; l++) {
                                n[l] = new Array;
                                for (var s = 0; s < a[l].length; s++) n[l][s] = new Object({
                                    x: Number(a[l][s][0]),
                                    y: Number(a[l][s][1])
                                })
                            }
                            o.paths = new Array;
                            for (var l = 0; l < n.length; l++) {
                                var c = _utils.convertPoints(n[l], 19);
                                o.paths[l] = new Array;
                                for (var p = new Array,
                                         s = 0; s < c.length; s++) p[s] = new Array,
                                    p[s].push(Number(c[s].x)),
                                    p[s].push(Number(c[s].y));
                                o.paths[l] = p
                            }
                            var u = _utils.convertPoint(r.mapPoint.x, r.mapPoint.y, 16);
                            o.x = Number(u.x),
                                o.y = Number(u.y),
                                o.mapEventType = e,
                                o.id = r.graphic.attributes.id,
                                _utils.callbackFuncRun(t, o)
                        }
                    }),
            "MapEvent_PointMarkerDragging" == e && (_utils._gis_PointDrag.dragFlag = !0, _utils._gis_PointDrag.callBackFn = t),
            "MapEvent_PointMarkerDragEnd" == e && (_utils._gis_PointDrag.dragEndFlag = !0, _utils._gis_PointDrag.callBackFnEnd = t)
        },
        addPointMarkers: function(e, t, r, o) {
            if (e) {
                var i = new Array;
                _utils.moveXY(i, e);
                var a = o ? o: 17;
                _utils.moveXY(e, _utils.convertPoints(e, a)),
                    _utils.addPoints2Map(e, t, r),
                    _utils.moveXY(e, i)
            }
        },
        addPointMarker: function(e, t, r, o, i) {
            if (i) {
                var a = o ? o: 11,
                    n = new Object;
                n.x = e.x,
                    n.y = e.y;
                var l = _utils.convertPoint(e.x, e.y, a);
                e.x = l.x,
                    e.y = l.y,
                    _utils.addPoints2Map([e], t, r),
                    e.x = n.x,
                    e.y = n.y
            } else _utils.addPoint2Map(e, t, r)
        },
        addPolygon: function(e, t, r, o, i, a, n, l, s) {
            if (t) for (var c = new Array,
                            p = 0; p < t.length; p++) {
                var u = t[p];
                _utils.moveXY(c, u);
                var d = _utils.parseSingleRing(u, 17),
                    y = new esri.geometry.Polygon({
                        rings: [d],
                        spatialReference: _mapObject.spatialReference
                    }),
                    m = new esri.Graphic;
                m.setGeometry(y),
                    y.userAttr = new Object,
                    y.userAttr.alpha = r,
                    y.userAttr.style = o,
                    y.userAttr.color = i,
                    y.userAttr.lineAlpha = a,
                    y.userAttr.lineColor = n,
                    y.userAttr.lineWidth = l,
                    y.userAttr.lineStyle = s;
                var g = new esri.symbol.SimpleLineSymbol;
                g.setColor(_utils.hexToRgbObject(n, a)),
                s && g.setStyle(s),
                isNaN(l) || g.setWidth(l);
                var h = new esri.symbol.SimpleFillSymbol;
                h.setOutline(g),
                    0 == r || "0" == r ? h.setStyle(esri.symbol.SimpleLineSymbol.STYLE_NULL) : (h.setColor(_utils.hexToRgbObject(i, r)), o && h.setStyle(o)),
                    m.setSymbol(h),
                    m.setAttributes({
                        id: e
                    }),
                    mapPolygonOverLayer.add(m),
                    _utils.moveXY(u, c)
            }
        },
        addPolyLine: function(e, t, r, o, i, a, n) {
            if (t) for (var l = new Array,
                            s = 0; s < t.length; s++) {
                var c = t[s];
                _utils.moveXY(l, c);
                var p = n ? n: 17,
                    u = _utils.parseSingleRing(c, p),
                    d = new esri.geometry.Polyline({
                        paths: [u],
                        spatialReference: _mapObject.spatialReference
                    }),
                    y = new esri.Graphic;
                y.setAttributes({
                    id: e
                }),
                    y.setGeometry(d),
                    d.userAttr = new Object,
                    d.userAttr.alpha = r,
                    d.userAttr.color = o,
                    d.userAttr.width = i,
                    d.userAttr.style = a;
                var m = new esri.symbol.SimpleLineSymbol;
                m.setColor(_utils.hexToRgbObject(o, r)),
                a && m.setStyle(a),
                isNaN(i) || m.setWidth(i),
                    y.setSymbol(m),
                    mapLineOverLayer.add(y),
                    _utils.moveXY(c, l)
            }
        },
        clearAll: function(e) {
            mapEllipseLayer && mapEllipseLayer.declaredClass && "layers" == mapEllipseLayer.declaredClass.split(".")[1] && mapEllipseLayer.clear(),
            mapGraphicLayer && mapGraphicLayer.declaredClass && "layers" == mapGraphicLayer.declaredClass.split(".")[1] && mapGraphicLayer.clear(),
            mapGridLayer && mapGridLayer.declaredClass && "layers" == mapGridLayer.declaredClass.split(".")[1] && mapGridLayer.clear(),
            mapLabelOverLayer && mapLabelOverLayer.declaredClass && "layers" == mapLabelOverLayer.declaredClass.split(".")[1] && mapLabelOverLayer.clear(),
            mapLineOverLayer && mapLineOverLayer.declaredClass && "layers" == mapLineOverLayer.declaredClass.split(".")[1] && mapLineOverLayer.clear(),
            mapMiniGridLayer && mapMiniGridLayer.declaredClass && "layers" == mapMiniGridLayer.declaredClass.split(".")[1] && mapMiniGridLayer.clear(),
            mapPointOverLayer && mapPointOverLayer.declaredClass && "layers" == mapPointOverLayer.declaredClass.split(".")[1] && mapPointOverLayer.clear(),
            mapPolygonOverLayer && mapPolygonOverLayer.declaredClass && "layers" == mapPolygonOverLayer.declaredClass.split(".")[1] && mapPolygonOverLayer.clear(),
            e && e.declaredClass && "layers" == e.declaredClass.split(".")[1] && e.clear()
        },
        clearEcllipse: function() {
            mapEllipseLayer && mapEllipseLayer.declaredClass && "layers" == mapEllipseLayer.declaredClass.split(".")[1] && mapEllipseLayer.clear()
        },
        clearLabelMarkers: function() {
            mapLabelOverLayer && mapLabelOverLayer.declaredClass && "layers" == mapLabelOverLayer.declaredClass.split(".")[1] && mapLabelOverLayer.clear()
        },
        clearPointMarkers: function() {
            mapPointOverLayer && mapPointOverLayer.declaredClass && "layers" == mapPointOverLayer.declaredClass.split(".")[1] && mapPointOverLayer.clear()
        },
        clearPolygons: function() {
            mapPolygonOverLayer && mapPolygonOverLayer.declaredClass && "layers" == mapPolygonOverLayer.declaredClass.split(".")[1] && mapPolygonOverLayer.clear()
        },
        clearPolyLines: function() {
            mapLineOverLayer && mapLineOverLayer.declaredClass && "layers" == mapLineOverLayer.declaredClass.split(".")[1] && mapLineOverLayer.clear()
        },
        getBDGeocodingData: function(e, t) {
            var r;
            e.address ? (r = new Object({
                address: e.address
            }), e.city && (r.city = e.city)) : e.location && (r = new Object({
                location: e.location.y + "," + e.location.x
            }), e.coordtype && (r.city = e.coordtype), 1 == e.pois && (r.pois = 1)),
                _utils.getBDApiData(bd_api_geocoder, r,
                    function(e) {
                        _utils.callbackFuncRun(t, e)
                    })
        },
        getCoordPoint: function(e, t, r) {
            var o = null;
            return 1 == r ? o = _utils.convertPoint(e, t, 11) : 2 == r && (o = _utils.convertPoint(e, t, 12)),
                o
        },
        getDoubleClickZoomEnabled: function() {
            return _mapObject.isDoubleClickZoom
        },
        getMapExtent: function() {
            if (_mapObject) {
                var e = _mapObject.extent,
                    t = new Object,
                    r = new Array;
                r[0] = new Object({
                    x: e.xmin,
                    y: e.ymin
                }),
                    r[1] = new Object({
                        x: e.xmax,
                        y: e.ymax
                    });
                var o = _utils.convertPoints(r, 19);
                return t.xmin = Number(o[0].x),
                    t.ymin = Number(o[0].y),
                    t.xmax = Number(o[1].x),
                    t.ymax = Number(o[1].y),
                    t
            }
        },
        getMapLevel: function() {
            return _mapObject.getLevel()
        },
        getMapScale: function() {
            return _mapObject.getScale()
        },
        getTwoPointDistance: function(e, t) {
            return _utils.getTwoPointDistanceForWgs84(e, t)
        },
        getTwoPointDistanceByBatch: function(e, t, r) {
            var o = new Array;
            if (null != pointArray && pointArray.length > 0) for (var i = 0; i < pointArray.length; i++) {
                var a = pointArray[i];
                _utils.getTwoPointDistanceForWgs84(a, oneP) <= r && o.push(a.id)
            }
            return o.length > 0 && o
        },
        hideInternalLayer: function(e) {
            var t = _utils.hideLayer(e);
            if (!t) {
                var r = _utils.getInternalLayerUrl(e);
                return r ? void _utils.hideLayer(r) : void 0
            }
        },
        init: function() {
            _mapObject && "esri.Map" == _mapObject.declaredClass && _mapObject.destroy(),
                _utils = new UtilsForGis(this),
                _utils.showLoadingDiv(),
                _utils.thCurrentType = this.NORMAL,
                _utils.setTransformPoint(this.transformPoint);
            var e = !!window.dojo;
            e /*|| (loadExtentFile(url_prefix + "jsapi/3.13/esri/css/esri.css", "css"), loadExtentFile(url_prefix + "jsapi/3.13/dijit/themes/tundra/tundra.css", "css"), loadExtentFile(url_prefix + resource_pro + "api/extra/_gisStyleFix.css", "css"), loadExtentFile(url_prefix + "jsapi/3.13/init.js", "js"))*/;
            var t = function() {
                e = !!window.dojo,
                    e ? _utils._initGis() : setTimeout(t, 50)


            };
            try {
                t()
            } catch(r) {
                console.log(r)
            }
        },
        isPointInPolygon: function(e, t) {
            var r = 0,
                o = e.x,
                i = e.y;
            if (t && t.length > 2) for (var a = 0; a < t.length; a++) {
                var n = t[a].x,
                    l = t[a].y,
                    s = t[(a + 1) % t.length].x,
                    c = t[(a + 1) % t.length].y;
                if (l != c) {
                    if (l >= i && i >= c || c >= i && i >= l) {
                        var p = (s - n) * (i - l) / (c - l) + n;
                        if (p == o) return ! 0;
                        if (p > o) {
                            var u = l < c ? l: c;
                            u != i && r++
                        }
                    }
                } else if ((n >= o && o >= s || s >= o && o >= n) && i == l) return ! 0
            }
            return r % 2 == 1
        },
        moveToTopById: function(e, t) {
            if (e && "string" == typeof e && "" != e) {
                var r = _mapObject.getLayer(e),
                    o = _mapObject._layerSize;
                null != r && _mapObject.reorderLayer(r, ++o)
            }
            if (t && "string" == typeof t && "" != t) switch (o = _mapObject._layerSize, t) {
                case "point":
                    _mapObject.reorderLayer(mapPointOverLayer, ++o);
                    break;
                case "ellipse":
                    _mapObject.reorderLayer(mapLabelOverLayer, ++o);
                    break;
                case "label":
                    _mapObject.reorderLayer(mapLineOverLayer, ++o);
                    break;
                case "line":
                    _mapObject.reorderLayer(mapLineOverLayer, ++o);
                    break;
                case "polygon":
                    _mapObject.reorderLayer(mapPolygonOverLayer, ++o)
            }
        },
        removeEcllipseById: function(e) {
            if (0 != mapEllipseLayer.graphics.length) {
                var t = mapEllipseLayer.graphics;
                if (_utils.isArray(e)) for (var r = 0; r < e.length; r++) for (var o = 0; o < t.length; o++) t[o].attributes.id == e[r] && mapEllipseLayer.remove(t[o]);
                else for (var o = 0; o < t.length; o++) t[o].attributes.id == e && mapEllipseLayer.remove(t[o])
            }
        },
        removeLabelMarkersById: function(e) {
            if (0 != mapLabelOverLayer.graphics.length) {
                var t = mapLabelOverLayer.graphics;
                if (_utils.isArray(e)) for (var r = 0; r < e.length; r++) for (var o = 0; o < t.length; o++) t[o].attributes.id == e[r] && mapLabelOverLayer.remove(t[o]);
                else for (var o = 0; o < t.length; o++) t[o].attributes.id == e && mapLabelOverLayer.remove(t[o])
            }
        },
        removeMapEventListener: function(e, t) {
            "MapEvent_ExtentChange" == e ? dojo.disconnect(mapExtentChangeEvent) : "MapEvent_MapClick" == e ? dojo.disconnect(mapClickEvent) : "MapEvent_MapDBClick" == e ? dojo.disconnect(mapDBClickEvent) : "MapEvent_MapLoad" == e ? dojo.disconnect(mapOnloadEvent) : "MapEvent_MapMouseMove" == e ? dojo.disconnect(mapMouseMoveEvent) : "MapEvent_PointMarkerClick" == e ? dojo.disconnect(pointMarkClickEvent) : "MapEvent_PointMarkerDbClick" == e ? dojo.disconnect(pointMarkDBClickEvent) : "MapEvent_PointMarkerDragging" == e ? (_utils._gis_PointDrag.dragFlag = !1, _utils._gis_PointDrag.callBackFn = null) : "MapEvent_PointMarkerDragEnd" == e ? (_utils._gis_PointDrag.dragEndFlag = !1, _utils._gis_PointDrag.callBackFnEnd = null) : "MapEvent_PolygonClick" == e ? dojo.disconnect(polygonClickEvent) : "MapEvent_PolygonDbClick" == e ? dojo.disconnect(polygonDBClickEvent) : "MapEvent_PolyLineClick" == e && dojo.disconnect(lineClickEvent)
        },
        removePointMarkersById: function(e) {
            if (0 != mapPointOverLayer.graphics.length) {
                var t = mapPointOverLayer.graphics;
                if (_utils.isArray(e)) for (var r = 0; r < e.length; r++) for (var o = 0; o < t.length; o++) t[o].attributes.id == e[r] && mapPointOverLayer.remove(t[o]);
                else for (var o = 0; o < t.length; o++) t[o].attributes.id == e && mapPointOverLayer.remove(t[o])
            }
        },
        removePolygonsById: function(e) {
            if (0 != mapPolygonOverLayer.graphics.length) {
                var t = mapPolygonOverLayer.graphics;
                if (_utils.isArray(e)) for (var r = 0; r < e.length; r++) for (var o = 0; o < t.length; o++) t[o].attributes.id == e[r] && mapPolygonOverLayer.remove(t[o]);
                else for (var o = 0; o < t.length; o++) t[o].attributes.id == e && mapPolygonOverLayer.remove(t[o])
            }
        },
        removePolyLinesById: function(e) {
            if (0 != mapLineOverLayer.graphics.length) {
                var t = mapLineOverLayer.graphics;
                if (_utils.isArray(e)) for (var r = 0; r < e.length; r++) for (var o = 0; o < t.length; o++) t[o].attributes.id == e[r] && mapLineOverLayer.remove(t[o]);
                else for (var o = 0; o < t.length; o++) t[o].attributes.id == e && mapLineOverLayer.remove(t[o])
            }
        },
        searchAddress: function(e, t, r) {
            if (! (e.level2 && "" != e.level2 || e.level3 && "" != e.level3 || e.level4 && "" != e.level4 || e.level5 && "" != e.level5)) {
                var o = new Object({
                    status: !1,
                    count: 0,
                    results: []
                });
                _utils.callbackFuncRun(r, o)
            }
            var i = e.level2 ? encodeURIComponent(encodeURIComponent(e.level2)) : "",
                a = e.level3 ? encodeURIComponent(encodeURIComponent(e.level3)) : "",
                n = e.level4 ? encodeURIComponent(encodeURIComponent(e.level4)) : "",
                l = e.level5 ? encodeURIComponent(encodeURIComponent(e.level5)) : "",
                s = e.page,
                c = e.rows,
                p = url_prefix;
            p += "gisManager/pub/search/seachAddress.do";
            var u = "ukey=7F57F6B3A53C49F98EBDAB28CF5A48E8&level2=";
            u += i,
                u += "&level3=",
                u += a,
                u += "&level4=",
                u += n,
                u += "&level5=",
                u += l,
                u += s ? "&page=" + s: "&page=1",
                u += c ? "&rows=" + c: "&rows=20",
            1 == Number(t) && _utils.showLoadingUniversal(),
                _utils._gisRequestPost(p, !0, u,
                    function() {
                        if (4 == _utils._gisXmlHttpRequest.readyState && 200 == _utils._gisXmlHttpRequest.status) {
                            var e = _utils._gisXmlHttpRequest.responseText,
                                o = JSON.parse(e)[0];
                            1 == Number(t) && "success" == o.status && Number(o.count) > 0 && _utils.showSearchAddress(o),
                                _utils.hideLoadingUniversal("mapLoadingStatus"),
                                _utils.callbackFuncRun(r, o)
                        }
                    })
        },
        searchAddress_Detail: function(e, t) {
            var r;
            if (e.poiId && "" != e.poiId) r = e.poiId;
            else {
                if (!e.poiIds || 0 == e.poiIds.length) return void _utils.returnError(t);
                r = e.poiIds
            }
            var o = e.scope ? e.scope: 1,
                i = new Object;
            i.scope = o,
                "string" == typeof r ? i.uid = r: i.uids = r,
                _utils.getBDApiData(bd_api_place + "detail", i,
                    function(e) {
                        _utils.callbackFuncRun(t, e)
                    })
        },
        searchAddress_BD: function(e, t, r) {
            if (null == e.searchText || "" == e.searchText) return void _utils.returnError(t);
            var o = dojo.attr(dojo.byId("_gisCurrentCityBtn"), "innerHTML");
            o = o ? o: "杭州";
            var i = e.cityText ? e.cityText: o,
                a = e.page_num ? e.page_num: 0;
            a - 1 >= 0 && (a -= 1);
            var n = new Object({
                query: e.searchText,
                region: i,
                scope: 2,
                page_num: a
            });
            _utils.getBDApiData(bd_api_place + "search", n,
                function(e) {
                    if (r) var o = _utils.formatPoiData_forBar(e);
                    else var o = _utils.formatPoiData(e);
                    _utils.callbackFuncRun(t, o)
                })
        },
        searchAddress_Suggestion: function(e, t) {
            if (null == e.searchText || "" == e.searchText) return void _utils.returnError(t);
            var r = dojo.attr(dojo.byId("_gisCurrentCityBtn"), "innerHTML"),
                o = e.cityText ? e.cityText: r ? r: "杭州",
                i = new Object({
                    query: e.searchText,
                    region: o
                });
            _utils.getBDApiData(bd_api_place + "suggestion", i,
                function(e) {
                    _utils.callbackFuncRun(t, e)
                })
        },
        setDoubleClickZoomEnabled: function(e) {
            e ? _mapObject.enableDoubleClickZoom() : _mapObject.disableDoubleClickZoom()
        },
        setMapCenter: function(e) {
            var t;
            t = e.type ? _utils.convertPoint(e.x, e.y, e.type) : _utils.convertPoint(e.x, e.y, 11);
            var r = new esri.geometry.Point(t.x, t.y, _mapObject.spatialReference);
            _mapObject.centerAt(r)
        },
        setMapExtent: function(e) {
            var t = new Array;
            t[0] = new Object({
                x: e.xmin,
                y: e.ymin
            }),
                t[1] = new Object({
                    x: e.xmax,
                    y: e.ymax
                });
            var r = _utils.convertPoints(t, 17),
                o = new esri.geometry.Extent(Number(r[0].x), Number(r[0].y), Number(r[1].x), Number(r[1].y), _mapObject.spatialReference);
            _mapObject.setExtent(o)
        },
        setMapLevel: function(e) {
            isNaN(e) || (e < 0 ? _mapObject.setLevel(0) : e > 16 && _mapObject.setLevel(16), _mapObject.setLevel(e))
        },
        setMapScale: function(e) {
            _mapObject.setScale(e)
        },
        setModuleShow: function(e) {
            this.modouleConfig = e;
            var t, r = this,
                o = function() {
                    _gis_mapWaitFlag ? (t = dojo.byId("_gis_WidgetsContainer"), t || (t = dojo.create("div", {
                        id: "_gis_WidgetsContainer"
                    }), dojo.place(t, dojo.byId(r.divID + "_root"), "last"), dojo.style(t, {
                        position: "absolute",
                        top: "30px",
                        left: "60px"
                    })), null == e ? (i("_gis_MeasureWidget"), i("searchBarTool_search_div"), dojo.byId("_gis_Citybox") && a("_gis_Citybox", r.gisToolBar.citySwitch), a("_gis_Switch_BaseMap", r.gisToolBar.showSwitchDiv)) : (1 == Number(e.searchShow) ? a("searchBarTool_search_div", r.gisToolBar.searchBar) : i("searchBarTool_search_div"), 1 == Number(e.distanceMeasurementShow) ? a("_gis_MeasureWidget", _utils.createMeasureButton) : i("_gis_MeasureWidget"), 1 == Number(e.distShow) ? a("_gis_Citybox", r.gisToolBar.citySwitch) : i("_gis_Citybox"), 1 == Number(e.switchMapShow) ? a("_gis_Switch_BaseMap", r.gisToolBar.showSwitchDiv) : i("_gis_Switch_BaseMap"))) : setTimeout(o, 100)
                },
                i = function(e) {
                    t = dojo.byId(e),
                    t && esri.hide(t)
                },
                a = function(e, r) {
                    t = dojo.byId(e),
                        t ? esri.show(t) : r()
                };
            o()
        },
        showInternalLayer: function(e, t) {
            if (0 == businessLayerManager) return void alert("不能访问业务图层");
            var r = null;
            _utils.showMapLoading(),
                r = _utils.getInternalLayerUrl(e),
                "031" == e ? _utils.addInternalLayer(r, t) : _utils.addInternalLayer(r)
        },
        showInternalLayer_dist_district: function(e, t, r, o, i) {
            var a = _mapObject.getLayer(e);
            if (null != a && a.show(), "" != e && null == _mapObject.getLayer(e)) {
                var n = _utils.addLayerFun(e);
                require([basehttp+"esri/tasks/query", basehttp+"esri/tasks/QueryTask"],
                    function(t, r) {
                        _utils.showMapLoading(!0);
                        var o = new esri.tasks.QueryTask(coverareadistUrl + "/0"),
                            i = new esri.tasks.Query;
                        i.returnGeometry = !0,
                            i.outFields = ["*"],
                            i.where = "layerid = '" + e + "'",
                            o.execute(i,
                                function(e) {
                                    if (0 != e.features.length) {
                                        for (var t = new esri.geometry.Extent,
                                                 r = 0; r < e.features.length; r++) {
                                            var o = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 0, 255, .35]), 1), new dojo.Color([125, 125, 125, .6])),
                                                i = e.features[r];
                                            i.setSymbol(o),
                                                n.add(i),
                                                t = 0 == r ? i.geometry.getExtent() : t.union(i.geometry.getExtent())
                                        }
                                        _mapObject.setExtent(t)
                                    }
                                })
                    })
            }
        },
        showTipOfPointMarker: function(e, t, r) {
            var o = mapPointOverLayer.graphics;
            _utils.hideInfoWindow();
            for (var i = 0; i < o.length; i++) {
                var a = o[i];
                if (a.attributes.id == e) {
                    r || (t = a.attributes.newcontent);
                    var n = new Object({
                        width: 200,
                        height: 200,
                        title: "",
                        content: t,
                        graphic: a
                    });
                    _utils.infoWindowOpen(n)
                }
            }
        },
        showTipOfPointMarker_set: function(e, t, r, o, i) {
            var a = mapPointOverLayer.graphics;
            _utils.hideInfoWindow();
            for (var n = 0; n < a.length; n++) {
                var l = a[n];
                if (l.attributes.id == e) {
                    r || (t = l.attributes.newcontent);
                    var s = new Object({
                        width: o,
                        height: i,
                        title: "",
                        content: t,
                        graphic: l
                    });
                    _utils.infoWindowOpen(s)
                }
            }
        }
    },
    Gis.prototype.addDistDemoMapLayer = function(e) {
        var t = _mapObject.getLayer(e);
        if (t) return _utils.showMapLoading(),
            void t.show();
        _utils.showMapLoading();
        var r = url_mapSvr_zj + "CELL_FLOW_HEAT/MapServer";
        _utils.addLayer(r, !0, 1, e)
    },
    Gis.prototype.showStyleLayer = function(e) {
        _utils.showMapLoading();
        var t = url_mapSvr_zj + "COVER_AREA_NEWDATA_RXLEV/MapServer/0",
            r = _utils.getRenderer(e),
            o = _mapObject.getLayer(e);
        void 0 != o && _mapObject.removeLayer(o),
            o = _utils.addLayerFun(e, !1, t, "featureLayer", esri.layers.FeatureLayer.MODE_ONDEMAND),
        r && _utils.editStyleToLayer(o, r, "polygon")
    },
    Gis.prototype.setLayerRenderer = function(e, t, r, o, i) {
        _utils.showMapLoading();
        var a = _mapObject.getLayer(e);
        if (void 0 == a) return "Not Found Layer";
        var n = new Object;
        t.style && (n.style = t.style),
        t.color && (n.color = t.color),
        t.size && (n.size = t.size),
        t.alpha && (n.alpha = t.alpha),
            n.lineAttr = new Object,
        r.style && (n.lineAttr.style = r.style),
        r.color && (n.lineAttr.color = r.color),
        r.width && (n.lineAttr.width = r.width),
        r.alpha && (n.lineAttr.alpha = r.alpha),
            _utils.editStyleToLayer(a, n, o, i)
    },
    Gis.prototype.setLayerRendererBySymbols = function(e, t, r) {
        function o() {
            var t = _utils.getInternalLayerUrl(e);
            if (null == t) return "Not Found Layer";
            var r = {
                outFields: ["*"],
                mode: esri.layers.FeatureLayer.MODE_SNAPSHOT
            };
            i = _utils.addLayerFun(e, !1, t + "/0", "featureLayer", r)
        }
        _utils.showMapLoading();
        var i = _mapObject.getLayer(e);
        void 0 == i ? o() : "esri.layers.ArcGISDynamicMapServiceLayer" == i.declaredClass && (_mapObject.removeLayer(i), o()),
            _utils.changeCustRangeMarker(i, t, r),
            i.refresh()
    },
    Gis.prototype.showHeatMapLayer = function(e, t) {
        var r = null;
        _utils.showMapLoading(),
            r = _utils.getInternalLayerUrl(e),
        r && _utils.addHeatMapLayer(e, r + "/0", t, !0)
    },
    Gis.prototype.gisToolBar = new Object,
    Gis.prototype.gisToolBar.toolEntity = null,
    Gis.prototype.gisToolBar.drawGraphic = function(e, t, r, o, i, a, n) {
        var l, s, c, p, u = _utils.getGisObject(),
            d = this.toolEntity;
        o ? "string" == typeof o ? (l = _mapObject.getLayer(o), l || (l = mapGraphicLayer)) : l = o: l = mapGraphicLayer,
            require([basehttp+"esri/toolbars/draw",basehttp+ "esri/symbols/SimpleMarkerSymbol", basehttp+"esri/symbols/SimpleLineSymbol", basehttp+"esri/symbols/SimpleFillSymbol",basehttp+ "esri/graphic", basehttp+"esri/Color", basehttp+"dojo/dom", basehttp+"dojo/on", basehttp+"dojo/domReady!"],
                function(o, y, m, g, h, _, b, v) {
                    function f(o) {
                        d.deactivate(),
                            d = null,
                            _mapObject.enableMapNavigation();
                        var i, a = o.geometry;
                        switch (e) {
                            case u.DRAW_ARROW:
                            case u.DRAW_DOWN_ARROW:
                            case u.DRAW_LEFT_ARROW:
                            case u.DRAW_RIGHT_ARROW:
                            case u.DRAW_UP_ARROW:
                            case u.DRAW_CIRCLE:
                            case u.DRAW_ELLIPSE:
                            case u.DRAW_EXTENT:
                            case u.DRAW_POLYGON:
                            case u.DRAW_TRIANGLE:
                            case u.DRAW_RECTANGLE:
                            case u.DRAW_FREEHAND_POLYGON:
                                i = w,
                                t && (0 == t.alpha || "0" == t.alpha ? i.setStyle("none") : (i.setColor(_utils.hexToRgbObject(t.color, t.alpha)), t.style && i.setStyle(t.style)), t.lineAttr && (L.setColor(_utils.hexToRgbObject(t.lineAttr.color, t.lineAttr.alpha)), t.lineAttr.style && L.setStyle(t.lineAttr.style), isNaN(t.lineAttr.width) || L.setWidth(t.lineAttr.width), i.setOutline(L)));
                                break;
                            case u.DRAW_LINE:
                            case u.DRAW_POLYLINE:
                            case u.DRAW_FREEHAND_POLYLINE:
                                i = L,
                                t && (i.setColor(_utils.hexToRgbObject(t.color, t.alpha)), t.style && i.setStyle(t.style), isNaN(t.width) || i.setWidth(t.width));
                                break;
                            case u.DRAW_POINT:
                            case u.DRAW_MULTI_POINT:
                                i = S,
                                t && (i.setColor(_utils.hexToRgbObject(t.color, t.alpha)), t.style && i.setStyle(t.style), t.lineAttr && (L.setColor(_utils.hexToRgbObject(t.lineAttr.color, t.lineAttr.alpha)), t.lineAttr.style && L.setStyle(t.lineAttr.style), isNaN(t.lineAttr.width) || L.setWidth(t.lineAttr.width), i.setOutline(L)))
                        }
                        if (l.add(new h(a, i)), c && dojo.disconnect(c), p && dojo.disconnect(p), r) {
                            var n;
                            if ("point" == a.type) n = _utils.convertPoint(a.x, a.y, 16),
                                n = [n];
                            else {
                                if ("extent" == a.type) {
                                    var s = _utils.convertPoints([{
                                        x: a.xmin,
                                        y: a.ymin
                                    },
                                        {
                                            x: a.xmax,
                                            y: a.ymax
                                        }], 19);
                                    n = {
                                        xmin: s[0].x,
                                        ymin: s[0].y,
                                        xmax: s[1].x,
                                        ymax: s[1].y
                                    }
                                } else {
                                    var y;
                                    a.points && (y = a.points),
                                    a.rings && (y = a.rings[0]),
                                    a.paths && (y = a.paths[0]),
                                        n = new Array;
                                    for (var m = 0; m < y.length; m++) n[m] = new Object({
                                        x: y[m][0],
                                        y: y[m][1]
                                    });
                                    n = _utils.convertPoints(n, 19)
                                }
                                n.type = e
                            }
                            _utils.callbackFuncRun(r, n)
                        }
                    }
                    var L = new m("solid", new _([255, 0, 0]), 1),
                        S = new y("circle", 10, L, new _([47, 192, 204, .8])),
                        w = new g("solid", L, new _([255, 255, 0, .25]));
                    _mapObject.disableMapNavigation(),
                    d && (d.deactivate(), d = null),
                        d = new o(_mapObject),
                        d.on("draw-end", f),
                    i && "function" == typeof i && (s = d.on("draw-end", i)),
                    a && "function" == typeof a && (c = dojo.connect(_mapObject, "onClick", a)),
                    n && "function" == typeof n && (p = dojo.connect(_mapObject, "onDblClick", n)),
                        d.activate(e),
                        l.clear()
                })
    },
    Gis.prototype.gisToolBar.drawMeasureGraphic = function() {
        var e = this.toolEntity,
            t = _mapObject.getLayer("startMeasureLayer");
        t && _mapObject.removeLayer(t),
            t = _utils.addLayerFun("startMeasureLayer");
        var r, o = new Array,
            i = 0,
            a = 0,
            n = 55;
        require([basehttp+"esri/toolbars/draw", basehttp+"esri/symbols/SimpleLineSymbol", basehttp+"esri/symbols/SimpleFillSymbol", basehttp+"esri/graphic",basehttp+ "esri/Color",basehttp+ "dojo/dom", basehttp+"dojo/dom-construct",basehttp+ "dojo/on", basehttp+"dojo/domReady!"],
            function(l, s, c, p, u, d, y, m) {
                function g(r) {
                    e.deactivate(),
                        e = null,
                        _mapObject.enableMapNavigation(),
                        dojo.disconnect(S),
                        dojo.disconnect(w),
                        t.add(new p(r.geometry, L))
                }
                function h(e, t) {
                    var r = new esri.Graphic,
                        o = new esri.geometry.Point(e.x, e.y, _mapObject.spatialReference);
                    r.setAttributes({
                        newcontent: e.html,
                        id: e.id,
                        canShowTip: e.canShowTip
                    }),
                        r.setGeometry(o);
                    var i = new Image;
                    if (i.src = e.source, i.complete) {
                        var a = new esri.symbol.PictureMarkerSymbol(i.src, i.width, i.height);
                        r.setSymbol(a),
                            t.add(r)
                    } else i.tGraphic = r,
                        i.onload = function() {
                            var e = new esri.symbol.PictureMarkerSymbol(this.src, this.width, this.height);
                            this.tGraphic.setSymbol(e),
                                t.add(this.tGraphic)
                        }
                }
                function _(e, t, r) {
                    var o = t / 1e3;
                    return 0 == i ? (n = 45, b(e, "起始点", 0)) : r ? (n = 120, b(e, "总长：" + o.toFixed(2) + "公里", 1)) : (n = 75, b(e, o.toFixed(2) + "公里"))
                }
                function b(e, r, o) {
                    var i = new Array,
                        a = new esri.geometry.Point(e.x, e.y, _mapObject.spatialReference),
                        l = new esri.Graphic;
                    i.push(l);
                    var s = new esri.symbol.PictureMarkerSymbol({
                        url: url_image + "bg_blue.png",
                        height: 20,
                        width: n
                    });
                    s.setOffset(50, 20),
                        l.setSymbol(s),
                        l.setGeometry(a),
                        t.add(l),
                        l = new esri.Graphic,
                        i.push(l),
                        l.setGeometry(a);
                    var c = new esri.symbol.Font("Microsoft YaHei");
                    c.setSize(10);
                    var p = new esri.symbol.TextSymbol({
                        text: r,
                        color: new esri.Color([0, 0, 255, 1]),
                        font: c
                    });
                    return p.setOffset(50, 14),
                        l.setSymbol(p),
                        t.add(l),
                    1 == o && v(e),
                        i
                }
                function v(e) {
                    var r = new esri.Graphic;
                    r.setAttributes({
                        id: "remove_Measure"
                    });
                    var o = new esri.symbol.PictureMarkerSymbol(url_image + "return_icon_03.png", 24, 24);
                    o.setOffset(20, -30),
                        r.setSymbol(o);
                    var i = new esri.geometry.Point(e.x, e.y, _mapObject.spatialReference);
                    r.setGeometry(i),
                        t.add(r),
                        dojo.connect(t, "onClick",
                            function(e) {
                                null != e.graphic.attributes && "remove_Measure" == e.graphic.attributes.id && (t.clear(), _mapObject.removeLayer(t))
                            })
                }
                function f(e, t) {
                    var r = e.x - t.x,
                        o = e.y - t.y;
                    return Math.pow(r * r + o * o, .5)
                }
                var L = new s(s.STYLE_SOLID, new u([255, 0, 0]), 2);
                _mapObject.disableMapNavigation(),
                e && (e.deactivate(), e = null),
                    e = new l(_mapObject),
                    e.on("draw-end", g);
                var S = dojo.connect(_mapObject, "onDblClick",
                    function(e) {
                        t.remove(r[0]),
                            t.remove(r[1]);
                        var n = {
                            id: "measurePoint" + i,
                            x: e.mapPoint.x,
                            y: e.mapPoint.y,
                            source: url_image + "fav_icon.png",
                            html: '<span>测试点001,<a href="http://www.10086.cn" target="_blank" color="#ff0000">点击</a>打开移动</span>',
                            canShowTip: !0
                        };
                        a += f(o[i - 1], n),
                            _(n, a, !0),
                            o.push(n)
                    }),
                    w = dojo.connect(_mapObject, "onClick",
                        function(e) {
                            var n = {
                                id: "measurePoint" + i,
                                x: e.mapPoint.x,
                                y: e.mapPoint.y,
                                source: url_image + "fav_icon.png",
                                html: '<span>测试点001,<a href="http://www.10086.cn" target="_blank" color="#ff0000">点击</a>打开移动</span>',
                                canShowTip: !0
                            };
                            0 != i && (a += f(o[i - 1], n)),
                                r = _(n, a, !1),
                                h(n, t),
                                o.push(n),
                                i += 1
                        });
                e.activate("polyline"),
                    t.clear()
            })
    },
    Gis.prototype.gisToolBar.searchBar = function() {
        var e, t = "searchBarTool",
            r = _utils.getGisObject(),
            o = dojo.byId(t + "_search_div");
        return o ? void esri.show(o) : void require([basehttp+"dojo/on", basehttp+"dojo/mouse", basehttp+"dojo/touch", basehttp+"dojo/dom-construct", basehttp+"dojo/query", basehttp+"dojo/dom-class", basehttp+"dojo/domReady!"],
            function(o, i, a, n, l, s) {
                function c(e, t) {
                    var s = dojo.byId(r.divID + "_root"),
                        c = e.result,
                        p = dojo.create("div");
                    dojo.style(p, {
                        backgroundColor: "#fff",
                        border: "1px solid #dedede",
                        position: "absolute",
                        top: "65px",
                        left: "60px",
                        width: "290px",
                        zIndex: 2
                    }),
                        dojo.place(p, s, "last");
                    var y = dojo.create("div");
                    dojo.place(y, p);
                    for (var m = function(e) {
                            o(e, i.enter,
                                function(e) {
                                    dojo.style(this, {
                                        backgroundColor: "#6abaf5"
                                    })
                                }),
                                o(e, i.leave,
                                    function(e) {
                                        dojo.style(this, {
                                            backgroundColor: "#ffffff"
                                        })
                                    }),
                                o(e, a.press,
                                    function(e) {
                                        dojo.style(this, {
                                            backgroundColor: "#2a7ab5"
                                        })
                                    }),
                                o(e, a.release,
                                    function(e) {
                                        dojo.style(this, {
                                            backgroundColor: "#6abaf5"
                                        })
                                    })
                        },
                             g = function(e) {
                                 var r = dojo.create("div");
                                 dojo.style(r, {
                                     padding: "5px"
                                 });
                                 var i = dojo.create("a");
                                 dojo.style(i, {
                                     padding: "5px",
                                     textDecoration: "none",
                                     width: "100%",
                                     display: "block",
                                     cursor: "pointer"
                                 });
                                 var a = dojo.create("span", {
                                         innerHTML: e.name.replace(t.trim(), "<b>" + t.trim() + "</b>")
                                     }),
                                     s = dojo.create("i", {
                                         innerHTML: "&nbsp;" + e.city + e.district
                                     });
                                 dojo.style(s, {
                                     color: "#7d7d7d"
                                 });
                                 var c = dojo.create("input", {
                                     type: "hidden",
                                     name: e.name
                                 });
                                 dojo.place(r, y, "last"),
                                     dojo.place(i, r),
                                     dojo.place(a, i),
                                     dojo.place(s, i),
                                     dojo.place(c, i),
                                     m(i),
                                     o(i, "click",
                                         function(e) {
                                             var t = l(this.children[2])[0];
                                             u.value = t.name,
                                                 d.click(),
                                                 n.destroy(p)
                                         })
                             },
                             h = function() {
                                 var e = dojo.create("div");
                                 dojo.style(e, {
                                     width: "100%",
                                     height: "100%"
                                 });
                                 var t = dojo.create("a", {
                                     innerHTML: "关闭"
                                 });
                                 dojo.style(t, {
                                     width: "100%",
                                     height: "30px",
                                     textDecoration: "none",
                                     lineHeight: "30px",
                                     cursor: "pointer",
                                     "float": "right",
                                     textAlign: "center"
                                 }),
                                     dojo.place(t, e),
                                     dojo.place(e, p, "last"),
                                     m(t),
                                     o(t, "click",
                                         function(e) {
                                             n.destroy(p)
                                         })
                             },
                             _ = 0; _ < c.length; _++) g(c[_]);
                    return o(y, i.enter,
                        function(e) {
                            w = !0
                        }),
                        o(y, i.leave,
                            function(e) {
                                w = !1
                            }),
                        h(),
                        p
                }
                var p = dojo.create("div", {
                    id: t + "_search_div"
                });
                dojo.style(p, {
                    width: "381px",
                    zIndex: 1
                });
                var u = dojo.create("input", {
                    id: t + "_search_input",
                    type: "text",
                    placeholder: "请输入搜索内容"
                });
                dojo.style(u, {
                    width: "290px",
                    height: "32px",
                    lineHeight: "30px",
                    paddingTop: "1px",
                    paddingLeft: "10px",
                    border: "none",
                    verticalAlign: "bottom",
                    borderTopLeftRadius: "5px",
                    borderBottomLeftRadius: "5px"
                });
                var d = dojo.create("button", {
                    id: t + "_search_button",
                    innerHTML: "搜索"
                });
                dojo.style(d, {
                    width: "78px",
                    height: "32px",
                    color: "white",
                    backgroundColor: "#4a9ad5",
                    textAlign: "center",
                    cursor: "pointer",
                    border: "none",
                    verticalAlign: "bottom",
                    borderTopRightRadius: "5px",
                    borderBottomRightRadius: "5px"
                });
                var y = dojo.create("div", {
                    id: t + "_result_div"
                });
                dojo.style(y, {
                    width: "380px",
                    height: "500px",
                    top: "35px",
                    left: "0px",
                    zIndex: "1",
                    marginTop: "2px",
                    backgroundColor: "#fff",
                    position: "absolute",
                    borderRight: "0 solid #ddd",
                    display: "none"
                });
                var m = dojo.create("div", {
                        id: t + "_result_pannel"
                    }),
                    g = dojo.create("div");
                dojo.style(g, {
                    width: "380px",
                    height: "30px",
                    lineHeight: "1",
                    backgroundColor: "#fff",
                    borderBottom: "1px solid #F0F0F0"
                });
                var h = dojo.create("div", {
                    innerHTML: "清除标记"
                });
                dojo.style(h, {
                    width: "100px",
                    height: "30px",
                    "float": "left",
                    lineHeight: "30px",
                    cursor: "pointer"
                });
                var _ = dojo.create("i", {
                    title: "清除标记"
                });
                dojo.style(_, {
                    width: "30px",
                    height: "30px",
                    "float": "left",
                    backgroundImage: "url(" + url_image + "trash.png)",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "3px"
                });
                var b = dojo.create("div", {
                    title: "关闭搜索结果"
                });
                dojo.style(b, {
                    width: "30px",
                    height: "30px",
                    "float": "right",
                    backgroundImage: "url(" + url_image + "close_btn2.png)",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    cursor: "pointer"
                });
                var v = dojo.create("div", {
                    id: t + "_result_bodyPannel",
                    pageno: "0",
                    clickindex: "-1"
                });
                dojo.style(v, {
                    width: "380px",
                    height: "420px",
                    marginBottom: "20px",
                    overflow: "auto"
                });
                var f = dojo.create("div", {
                        id: t + "_result_bottomPannel"
                    }),
                    L = dojo.create("div", {
                        id: t + "_result_pageBar"
                    });
                dojo.style(L, {
                    margin: "0 auto"
                }),
                    dojo.place(y, p, "last"),
                    dojo.place(u, p, "first"),
                    dojo.place(d, u, "after"),
                    dojo.place(p, dojo.byId(_gis_WidgetsContainer), "last"),
                    dojo.place(m, y),
                    dojo.place(g, m),
                    dojo.place(h, g),
                    dojo.place(_, h, "first"),
                    dojo.place(b, g, "last"),
                    dojo.place(v, m, "last"),
                    dojo.place(f, m, "last"),
                    dojo.place(L, f),
                    o(h, i.enter,
                        function(e) {
                            dojo.style(_, {
                                backgroundPosition: "-21px 3px"
                            }),
                                dojo.style(this, {
                                    color: "#46bee4"
                                })
                        }),
                    o(h, i.leave,
                        function(e) {
                            dojo.style(_, {
                                backgroundPosition: "3px"
                            }),
                                dojo.style(this, {
                                    color: "#000"
                                })
                        }),
                    o(h, a.press,
                        function(e) {
                            dojo.style(_, {
                                backgroundPosition: "3px"
                            }),
                                dojo.style(this, {
                                    color: "#000"
                                })
                        }),
                    o(h, a.release,
                        function(e) {
                            dojo.style(_, {
                                backgroundPosition: "-21px 3px"
                            }),
                                dojo.style(this, {
                                    color: "#46bee4"
                                })
                        }),
                    o(b, i.enter,
                        function(e) {
                            dojo.style(this, {
                                backgroundImage: "url(" + url_image + "close_btn_hover2.png)"
                            })
                        }),
                    o(b, i.leave,
                        function(e) {
                            dojo.style(this, {
                                backgroundImage: "url(" + url_image + "close_btn2.png)"
                            })
                        }),
                    o(b, a.press,
                        function(e) {
                            dojo.style(this, {
                                backgroundImage: "url(" + url_image + "close_btn2.png)"
                            })
                        }),
                    o(b, a.release,
                        function(e) {
                            dojo.style(this, {
                                backgroundImage: "url(" + url_image + "close_btn_hover2.png)"
                            })
                        }),
                    o(d, i.enter,
                        function(e) {
                            dojo.style(this, {
                                backgroundColor: "#6abaf5"
                            })
                        }),
                    o(d, i.leave,
                        function(e) {
                            dojo.style(this, {
                                backgroundColor: "#4a9ad5"
                            })
                        }),
                    o(d, a.press,
                        function(e) {
                            dojo.style(this, {
                                backgroundColor: "#2a7ab5"
                            })
                        }),
                    o(d, a.release,
                        function(e) {
                            dojo.style(this, {
                                backgroundColor: "#6abaf5"
                            })
                        });
                var S, w = !1;
                o(u, "input",
                    function(e) {
                        esri.hide(y);
                        var t = u.value;
                        if (null == t || "" == t) return void n.destroy(S);
                        var o = new Object({
                            searchText: t
                        });
                        r.searchAddress_Suggestion(o,
                            function(e) {
                                n.destroy(S),
                                0 != e.result.length && (S = c(e, t))
                            })
                    }),
                    o(u, "keypress",
                        function(e) {
                            e.keyCode == dojo.keys.ENTER && (n.destroy(S), d.click())
                        }),
                    o(u, "keydown",
                        function(e) {
                            e.keyCode == dojo.keys.BACKSPACE && n.destroy(S)
                        }),
                    o(u, "blur",
                        function(e) {
                            w || n.destroy(S)
                        }),
                    o(b, "click",
                        function(e) {
                            esri.hide(y)
                        }),
                    o(h, "click",
                        function(e) {
                            r.clearPointMarkers(),
                                _utils.hideInfoWindow()
                        }),
                    o(d, "click",
                        function(t) {
                            function o(e) {
                                if (0 != e.rows.length) {
                                    s.add(v, "no-result"),
                                        dojo.empty(v);
                                    for (var t = e.rows,
                                             i = 0; i < t.length; i++) dojo.place(createResultItem(t[i], i)[0], v, "last");
                                    initPageBar(e.total,
                                        function() {
                                            var e = parseInt(dojo.attr(v, "pageNo")),
                                                t = dojo.attr(this, "value");
                                            t = "previous" == t ? e - 1 : "next" == t ? e + 1 : parseInt(t),
                                                p.page_num = t,
                                                dojo.attr(v, "pageNo", t),
                                                clearOldResultPoint(r),
                                                dojo.html.set(v, "");
                                            var i = dojo.create("div", {
                                                innerHTML: "搜所结果"
                                            });
                                            dojo.style(i, {
                                                textAlign: "center",
                                                lineHeight: "50px"
                                            }),
                                                dojo.place(i, v),
                                                esri.show(y),
                                                r.searchAddress_BD(p, o, !0)
                                        }),
                                        _utils.showSearchPointResult(e, 12),
                                        dojo.style(v, {
                                            display: "block"
                                        }),
                                        dojo.style(f, {
                                            display: "block"
                                        })
                                } else search()
                            }
                            e = 1,
                                dojo.attr(v, "pageNo", e),
                                clearOldResultPoint(r),
                                dojo.html.set(v, "");
                            var i = dojo.create("div", {
                                innerHTML: "搜索..."
                            });
                            dojo.style(i, {
                                textAlign: "center",
                                lineHeight: "50px"
                            }),
                                dojo.place(i, v),
                                n.destroy(S),
                                esri.show(y);
                            var a = u.value;
                            if (null == a || "" == a) return n.destroy(S),
                                void esri.hide(y);
                            var l = dojo.attr(dojo.byId("_gisCurrentCityBtn"), "innerHTML"),
                                c = l ? l: "杭州",
                                p = new Object({
                                    searchText: a,
                                    cityText: c,
                                    page_num: e
                                });
                            r.searchAddress_BD(p, o, !0)
                        })
            })
    },
    Gis.prototype.gisToolBar.showSwitchDiv = function() {
        var e = _utils.getGisObject();
        require([basehttp+"dojo/on", basehttp+"dojo/mouse", basehttp+"dojo/touch", basehttp+"dojo/domReady!"],
            function(t, r, o) {
                function i(e) {
                    dojo.style(e, {
                        width: "80px",
                        height: "60px",
                        margin: "5px",
                        "float": "left"
                    });
                    var o = dojo.create("div", {
                        id: dojo.attr(e, "id") + "_ov",
                        innerHTML: dojo.attr(e, "thematicType")
                    });
                    dojo.style(o, {
                        height: "20px",
                        backgroundColor: "black",
                        color: "white",
                        display: "none",
                        "float": "left"
                    }),
                        dojo.place(o, e),
                        dojo.attr(e, "title", dojo.attr(e, "thematicType").toLocaleUpperCase()),
                        t(e, r.enter,
                            function(e) {
                                dojo.style(o, {
                                    display: "block"
                                })
                            }),
                        t(e, r.leave,
                            function(e) {
                                dojo.style(o, {
                                    display: "none"
                                })
                            }),
                        dojo.connect(e, "click", a)
                }
                function a(e) {
                    var t = dojo.byId(e.target.id.replace("_ov", ""));
                    _utils.switchBaseMap(dojo.attr(t, "thematicType")),
                        dojo.style(f, {
                            backgroundImage: dojo.style(t, "backgroundImage"),
                            backgroundPosition: dojo.style(t, "backgroundPosition")
                        })
                }
                var n = dojo.create("div", {
                        id: "_gis_Switch_BaseMap"
                    }),
                    l = dojo.create("div", {
                        id: "panorama_dark",
                        thematicType: e.DARK
                    }),
                    s = dojo.create("div", {
                        id: "panorama_light",
                        thematicType: e.LIGHT
                    }),
                    c = dojo.create("div", {
                        id: "panorama_grassgreen",
                        thematicType: e.GRASSGREEN
                    }),
                    p = dojo.create("div", {
                        id: "panorama_redalert",
                        thematicType: e.REDALERT
                    }),
                    u = dojo.create("div", {
                        id: "panorama_midnight",
                        thematicType: e.MIDNIGHT
                    }),
                    d = dojo.create("div", {
                        id: "panorama_pink",
                        thematicType: e.PINK
                    }),
                    y = dojo.create("div", {
                        id: "panorama_darkgreen",
                        thematicType: e.DARKGREEN
                    }),
                    m = dojo.create("div", {
                        id: "panorama_bluish",
                        thematicType: e.BLUISH
                    }),
                    g = dojo.create("div", {
                        id: "panorama_grayscale",
                        thematicType: e.GRAYSCALE
                    }),
                    h = dojo.create("div", {
                        id: "panorama_hardedge",
                        thematicType: e.HARDEDGE
                    }),
                    _ = dojo.create("div", {
                        id: "panorama_googlelite",
                        thematicType: e.GOOGLELITE
                    }),
                    b = dojo.create("div", {
                        id: "panorama_satellite",
                        thematicType: "satellite"
                    }),
                    v = dojo.create("div", {
                        id: "panorama_normal",
                        thematicType: e.NORMAL
                    }),
                    f = dojo.create("div", {
                        id: "panorama_current",
                        thematicType: e.NORMAL
                    }),
                    L = dojo.create("div"),
                    S = dojo.create("div"),
                    w = dojo.create("div");
                dojo.style(n, {
                    position: "absolute",
                    padding: "5px",
                    zIndex: "2",
                    right: "20px",
                    bottom: "20px",
                    cursor: "pointer"
                }),
                    i(l),
                    dojo.style(l, {
                        backgroundImage: "url(" + url_image + "LayerView/dark.png)"
                    }),
                    i(s),
                    dojo.style(s, {
                        backgroundImage: "url(" + url_image + "LayerView/light.png)"
                    }),
                    i(c),
                    dojo.style(c, {
                        backgroundImage: "url(" + url_image + "LayerView/grassgreen.png)"
                    }),
                    i(u),
                    dojo.style(u, {
                        backgroundImage: "url(" + url_image + "LayerView/midnight.png)"
                    }),
                    i(p),
                    dojo.style(p, {
                        backgroundImage: "url(" + url_image + "LayerView/redalert.png)"
                    }),
                    i(d),
                    dojo.style(d, {
                        backgroundImage: "url(" + url_image + "LayerView/pink.png)"
                    }),
                    i(y),
                    dojo.style(y, {
                        backgroundImage: "url(" + url_image + "LayerView/darkgreen.png)"
                    }),
                    i(m),
                    dojo.style(m, {
                        backgroundImage: "url(" + url_image + "LayerView/bluish.png)"
                    }),
                    i(g),
                    dojo.style(g, {
                        backgroundImage: "url(" + url_image + "LayerView/grayscale.png)"
                    }),
                    i(h),
                    dojo.style(h, {
                        backgroundImage: "url(" + url_image + "LayerView/hardedge.png)"
                    }),
                    i(_),
                    dojo.style(_, {
                        backgroundImage: "url(" + url_image + "LayerView/googlelite.png)"
                    }),
                    i(b),
                    dojo.style(b, {
                        backgroundImage: "url(" + url_image + "LayerView/maptype.png)",
                        backgroundPosition: "0 -60px"
                    }),
                    i(v),
                    dojo.style(v, {
                        backgroundImage: "url(" + url_image + "LayerView/maptype.png)",
                        display: "none"
                    }),
                    i(f),
                    dojo.style(f, {
                        backgroundImage: "url(" + url_image + "LayerView/maptype.png)",
                        display: "block"
                    }),
                    navigator.userAgent.indexOf("MSIE") > 0 ? navigator.userAgent.indexOf("MSIE 8.0") > 0 || navigator.userAgent.indexOf("MSIE 7.0") > 0 || navigator.userAgent.indexOf("MSIE 6.0") > 0 ? (dojo.style(L, {
                        width: "368px",
                        height: "216px",
                        "float": "right",
                        display: "none",
                        background: "#66ffcc"
                    }), dojo.style(S, {
                        width: "90px",
                        height: "70px",
                        clear: "both",
                        "float": "right",
                        background: "#66ffcc"
                    })) : (dojo.style(L, {
                        width: "360px",
                        height: "210px",
                        "float": "right",
                        display: "none",
                        backgroundColor: "rgba(124,255,204,0.6)"
                    }), dojo.style(S, {
                        "float": "right",
                        backgroundColor: "rgba(124,255,204,0.6)"
                    })) : (dojo.style(L, {
                        width: "360px",
                        height: "210px",
                        display: "none",
                        backgroundColor: "rgba(124,255,204,0.6)"
                    }), dojo.style(S, {
                        "float": "right",
                        backgroundColor: "rgba(124,255,204,0.6)"
                    })),
                    dojo.style(w, {
                        width: "270px",
                        height: "70px",
                        "float": "left"
                    }),
                    dojo.place(L, n, "last"),
                    dojo.place(l, L, "last"),
                    dojo.place(s, L, "last"),
                    dojo.place(c, L, "last"),
                    dojo.place(u, L, "last"),
                    dojo.place(p, L, "last"),
                    dojo.place(d, L, "last"),
                    dojo.place(y, L, "last"),
                    dojo.place(m, L, "last"),
                    dojo.place(g, L, "last"),
                    dojo.place(h, L, "last"),
                    dojo.place(_, L, "last"),
                    dojo.place(b, L, "last"),
                    dojo.place(w, n, "last"),
                    dojo.place(S, n, "last"),
                    dojo.place(v, S, "last"),
                    dojo.place(f, S, "last"),
                    dojo.place(n, dojo.byId(e.divID + "_root"), "first"),
                    t(n, r.enter,
                        function(e) {
                            dojo.style(L, {
                                display: "block"
                            }),
                                dojo.style(w, {
                                    display: "block"
                                }),
                                dojo.style(v, {
                                    display: "block"
                                }),
                                dojo.style(f, {
                                    display: "none"
                                })
                        }),
                    t(n, r.leave,
                        function(e) {
                            dojo.style(L, {
                                display: "none"
                            }),
                                dojo.style(w, {
                                    display: "none"
                                }),
                                dojo.style(v, {
                                    display: "none"
                                }),
                                dojo.style(f, {
                                    display: "block"
                                })
                        }),
                    t(w, r.enter,
                        function(e) {
                            dojo.style(L, {
                                display: "none"
                            }),
                                dojo.style(w, {
                                    display: "none"
                                }),
                                dojo.style(v, {
                                    display: "none"
                                }),
                                dojo.style(f, {
                                    display: "block"
                                })
                        })
            })
    },
    Gis.prototype.gisToolBar.citySwitch = function() {
        var e = _utils.getGisObject(),
            t = dojo.byId("_gis_Citybox");
        if (t) return void esri.show(t);
        var r = function(r) {
            t = window._gis_tmpSnippet,
            t && (dojo.place(t, dojo.byId("_gis_WidgetsContainer"), "last"), require([basehttp+"dojo/on", basehttp+"dojo/dom-construct"],
                function(t, r) {
                    var o = dojo.query("._gis-city-item", e.divID + "_root"),
                        i = dojo.query("._gis-to-dist-item", e.divID + "_root"),
                        a = dojo.byId("_gisDropDownBtn");
                    t(a, "click",
                        function(e) {
                            var t = "▼" == a.innerHTML;
                            a.innerHTML = t ? "▲": "▼",
                                t ? esri.show(dojo.query("._gis-city-panel")[0]) : esri.hide(dojo.query("._gis-city-panel")[0])
                        }),
                        t(dojo.byId("_gisCurrentCityBtn"), "click",
                            function(t) {
                                var r = t.currentTarget.innerHTML;
                                r = _utils.city_DistCoord[r],
                                    e.setMapCenter(r)
                            }),
                        t(dojo.byId("_gis_cityPannelClose"), "click",
                            function(e) {
                                esri.hide(dojo.query("._gis-city-panel")[0]),
                                    a.innerHTML = "▼"
                            }),
                        o.forEach(function(r) {
                            t(r, "click",
                                function(t) {
                                    var r = t.currentTarget.innerHTML,
                                        o = dojo.attr(dojo.byId("_gisCurrentCityBtn"), "innerHTML");
                                    if (r != o) {
                                        cPoint = _utils.city_DistCoord[r],
                                            o = dojo.byId("_gis_cityCurrent");
                                        var i = "景宁县" == r ? "景宁畲族自治县": r;
                                        o.innerHTML = cPoint.p ? cPoint.p + i: i,
                                            o = dojo.byId("_gisCurrentCityBtn"),
                                            o.innerHTML = r,
                                            e.setMapCenter(cPoint)
                                    }
                                })
                        }),
                        i.forEach(function(e) {
                            t(e, "click",
                                function(e) {
                                    var t = e.currentTarget.innerHTML,
                                        r = dojo.byId("_gis-city-dist-dl"),
                                        o = r.scrollHeight;
                                    if ("W" == t || "Z" == t) r.scrollTop = o;
                                    else if ("H" == t) r.scrollTop = 0;
                                    else {
                                        var i = dojo.attr(e.currentTarget, "sTop");
                                        i = i / o * o,
                                            r.scrollTop = i
                                    }
                                })
                        }),
                        window._gis_tmpSnippet = void 0,
                        r.destroy(dojo.query('script[src="' + url_prefix + resource_pro + 'api/extra/citySnippet.js"]')[0])
                }))
        };
        dojo.io.script.get({
            url: url_prefix + resource_pro + "api/extra/citySnippet.js",
            load: function(e) {
                r()
            },
            error: function(e) {
                console.debug("add cityswitch error!"),
                    console.debug(e)
            }
        })
    };
var spatialGeometry = null,
    handler = null,
    tb = null;
Gis.prototype.addSpatialComputing = function(e) {
    require([basehttp+"esri/toolbars/draw"],
        function(t) {
            tb || addMeasureServer(),
                0 == e ? tb.activate(esri.toolbars.Draw.POINT) : 1 == e ? tb.activate(esri.toolbars.Draw.POLYLINE) : 2 == e ? (handler && (handler = dojo.disconnect(handler)), tb.activate(esri.toolbars.Draw.POLYGON), handler = dojo.connect(geometryService, "onAreasAndLengthsComplete", outputAreaAndLength)) : 3 == e ? (null != handler && (handler = dojo.disconnect(handler)), tb.activate(esri.toolbars.Draw.POLYGON), handler = dojo.connect(geometryService, "onAreasAndLengthsComplete", doBuffer)) : 4 == e ? tb.activate(esri.toolbars.Draw.POINT) : 5 == e ? (handler && (handler = dojo.disconnect(handler)), tb.activate(esri.toolbars.Draw.POLYGON), handler = dojo.connect(geometryService, "onAreasAndLengthsComplete", doCount)) : 6 == e ? (handler && (handler = dojo.disconnect(handler)), tb.activate(esri.toolbars.Draw.POLYGON), handler = dojo.connect(geometryService, "onAreasAndLengthsComplete", doSuperCount)) : 7 == e && (handler && (handler = dojo.disconnect(handler)), tb.activate(esri.toolbars.Draw.POLYGON), handler = dojo.connect(geometryService, "onAreasAndLengthsComplete", doMost))
        })
},
    Gis.prototype.docale = function(e, t) {
        require([basehttp+"esri/units",basehttp+ "esri/geometry/Circle", basehttp+"dojo/dom"],
            function(r, o, i) {
                function a(e) {
                    function t(e) {
                        for (var t, o = e.features,
                                 i = [], a = 0; a < o.length; a++) t = o[a],
                        p.contains(t.geometry) && i.push(t.attributes.UUID);
                        var n = new esri.tasks.Query;
                        n.geometry = p,
                            r.selectFeatures(n, esri.layers.FeatureLayer.SELECTION_NEW,
                                function(e) {
                                    for (var t = e.length,
                                             r = 0; r < t; r++) {
                                        var o = new esri.InfoTemplate;
                                        o.setContent("rru-objectid:" + e[r].attributes.OBJECTID),
                                            e[r].setInfoTemplate(o)
                                    }
                                })
                    }
                    var r = new esri.layers.FeatureLayer(_testDemo + "/0", {
                            id: "demodata"
                        }),
                        o = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 12, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_NULL, new dojo.Color([247, 34, 101, .9]), 1), new dojo.Color([207, 34, 171, .5]));
                    r.setSelectionSymbol(o);
                    var i = (new esri.symbol.SimpleMarkerSymbol).setSize(0);
                    r.setRenderer(new esri.renderer.SimpleRenderer(i)),
                        _mapObject.addLayer(r);
                    var a = new esri.tasks.Query;
                    a.geometry = p.getExtent(),
                        r.queryFeatures(a, t)
                }
                var n = new esri.geometry.Point(e, t, _mapObject.spatialReference),
                    l = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 5, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 255, 255]), 4), new dojo.Color([250, 139, 46])),
                    s = new esri.Graphic;
                s.setGeometry(n),
                    s.setSymbol(l),
                    mapSpatialLayer.add(s);
                var c = new esri.geometry.Point(e, t, _mapObject.spatialReference),
                    p = new o({
                        center: c,
                        geodesic: !0,
                        radius: 1,
                        radiusUnit: r.KILOMETERS
                    }),
                    u = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, .25])),
                    d = new esri.Graphic;
                d.setGeometry(p),
                    d.setSymbol(u),
                    mapSpatialLayer.add(d),
                    a(p)
            })
    },
    Gis.prototype.isGraphic2Graphic = function(e, t, r, o) {
        function i(e) {
            var t = !0;
            switch (e[0].type) {
                case "point":
                    "NaN" == e[0].x && (t = !1);
                    break;
                case "polyline":
                    0 == e[0].paths.length && (t = !1)
            }
            o(t)
        }
        function a(e) {
            console.log(e)
        }
        require([basehttp+"esri/tasks/GeometryService", basehttp+"dojo/dom"],
            function(o, n) {
                var l, s;
                if (1 == e) {
                    var c = new esri.geometry.Point(t[0], t[1], _mapObject.spatialReference);
                    l = [c],
                        s = new esri.geometry.Polyline({
                            paths: [r],
                            spatialReference: _mapObject.spatialReference
                        })
                } else if (2 == e) {
                    var c = new esri.geometry.Point(t[0], t[1], _mapObject.spatialReference);
                    l = [c],
                        s = new esri.geometry.Polygon({
                            rings: [r],
                            spatialReference: _mapObject.spatialReference
                        })
                } else if (3 == e) {
                    var p = new esri.geometry.Polyline({
                        paths: [t],
                        spatialReference: _mapObject.spatialReference
                    });
                    l = [p],
                        s = new esri.geometry.Polyline({
                            paths: [r],
                            spatialReference: _mapObject.spatialReference
                        })
                } else if (4 == e) {
                    var p = new esri.geometry.Polyline({
                        paths: [t],
                        spatialReference: _mapObject.spatialReference
                    });
                    l = [p],
                        s = new esri.geometry.Polygon({
                            rings: [r],
                            spatialReference: _mapObject.spatialReference
                        })
                } else if (5 == e) {
                    var u = new esri.geometry.Polygon({
                        rings: [t],
                        spatialReference: _mapObject.spatialReference
                    });
                    l = [u],
                        s = new esri.geometry.Polygon({
                            rings: [r],
                            spatialReference: _mapObject.spatialReference
                        })
                }
                e > 0 && e < 6 && (geometryService || (geometryService = geometryService = new o(url_mapSvrPre + "arcgis/rest/services/Utilities/Geometry/GeometryServer")), geometryService.intersect(l, s, i, a))
            })
    },
    Gis.prototype.isLine2Line = function(e, t) {
        var r = {
                x: e[0][0],
                y: e[0][1]
            },
            o = {
                x: e[1][0],
                y: e[1][1]
            },
            i = {
                x: t[0][0],
                y: t[0][1]
            },
            a = {
                x: t[1][0],
                y: t[1][1]
            },
            n = segmentsIntr(r, o, i, a);
        return n && (n = !0),
            n
    };
var xmlHttpRequest;
Gis.prototype.coord2Point = function(e, t, r) {
    var o = _utils.convertPoint(e, t, 1);
    return o
},
    Gis.prototype.satnav = function(e, t) {
        var r = {
                id: "0001",
                x: e.x,
                y: e.y,
                source: url_image + "fav_icon.png",
                html: "起点",
                canShowTip: !1,
                canDrag: !1
            },
            o = {
                id: "0002",
                x: t.x,
                y: t.y,
                source: url_image + "fav_icon.png",
                html: "终点",
                canShowTip: !1,
                canDrag: !1
            };
        this.addPointMarkers([r, o]);
        var i = (_utils.convertPoint(e.x, e.y, 1), _utils.convertPoint(t.x, t.y, 1), bd_api_direction + "transit?origin=" + e.y + "," + e.x + "&destination=" + t.y + "," + t.x + "&coord_type=wgs84&ak=nv89hhhaRpvdtk4HojFMM8NLUAhCMMVm&callback=callbackf"),
            a = {
                url: i,
                error: function(e) {}
            };
        dojo.io.script.get(a)
    },
    Gis.prototype.clearSpaAndSat = function() {
        mapSpatialLayer.clear(),
            mapSatnavLayer.clear(),
            mapPointOverLayer.clear(),
            mapLineOverLayer.clear();
        var e = _mapObject.getLayer("demodata");
        e && _mapObject.removeLayer(e);
        var t = _mapObject.getLayer("measureLayer");
        t && _mapObject.removeLayer(t);
        var r = _mapObject.getLayer("clusters");
        r && _mapObject.removeLayer(r),
            _utils.removeLayer("demodata"),
            _utils.removeLayer("_CELL_FLOW_HEAT_poi_demo_"),
            _utils.removeLayer("061_demo_layer"),
            _utils.removeLayer("_gr_style_demo_"),
            _utils.removeLayer("_CELL_FLOW_HEAT_heatmap_demo_"),
            _utils.removeLayer("_CELL_FLOW_HEAT_distmap_demo_")
    },
    Gis.prototype.getBDPicturePoint = function(e) {
        function t(e, t, r, o, i, a) {
            mapSpatialLayer.clear(),
                mapSpatialLayer.add(a);
            var n = new Object({
                width: t,
                height: r,
                title: i,
                content: o,
                graphic: a
            });
            _utils.infoWindowOpen(n),
                _utils.hideLoadingUniversal("mapLoadingStatus")
        }
        var r = (e.x, e.y, _utils.convertPoint(e.x, e.y, 11)),
            o = "http://api.map.baidu.com/panorama/v2?ak=nv89hhhaRpvdtk4HojFMM8NLUAhCMMVm&width=350&height=250&fov=180&coordtype=wgs84ll&location=+" + e.x + "," + e.y,
            i = new esri.geometry.Point(r.x, r.y, _mapObject.spatialReference),
            a = new esri.symbol.PictureMarkerSymbol(url_image + "fav_icon.png", 16, 24),
            n = new esri.Graphic(i, a),
            l = new Image;
        l.src = o,
            l.CurPos = i,
            l.clickPoint = n,
            l.title = "全景图片",
            l.complete ? t(this.CurPos, 370, 270, this, this.title, this.clickPoint) : (l.onload = function() {
                t(this.CurPos, 370, 270, this, this.title, this.clickPoint)
            },
                l.onerror = function() {
                    var e = '<h5 style="color:red">未找到全景图</h5>';
                    t(this.CurPos, 200, 100, e, this.title, this.clickPoint)
                })
    },
    Gis.prototype.getBDPanorama = function() {
        _mapObject.setMapCursor("pointer"),
        handler && (handler = dojo.disconnect(handler)),
            handler = dojo.connect(_mapObject, "onClick", doclick)
    },
    Gis.prototype.unBindBdPictureUtil = function() {
        _mapObject.setMapCursor("default"),
        handler && (handler = dojo.disconnect(handler))
    },
    Gis.prototype.getStatistical = function(e) {
        addMsPointsServer(e)
    },
    Gis.prototype.getAreaAndLength = function() {
        addMsAreaServer()
    },
    Gis.prototype.getBuffer = function(e) {
        addMsBufferServer(e)
    },
    Gis.prototype.getInnerCircle = function(e, t, r) {
        AddMsCircleServer(e, t, r)
    },
    Gis.prototype.getPolymerization = function(e) {
        doPolymerization(e)
    };

module.exports.Gis = Gis;

});