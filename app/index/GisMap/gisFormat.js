!
function(e, t) {
	function i(e) {
		var t;
		window.ActiveXObject ? t = new ActiveXObject("Microsoft.XMLHTTP") : window.XMLHttpRequest && (t = new XMLHttpRequest),
		t.onreadystatechange = function() {
			4 == t.readyState && 200 == t.status
		};
		var i = "http://10.70.194.131/gisManager/pub/search/seachAddress.do?level2=1";
		t.open("POST", i, !1),
		t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8"),
		t.send(),
		e()
	}
	function r(e) {
		var t, i, r, o;
		t = document.createElement("div"),
		t.style.width = "100%",
		t.style.height = "100%",
		t.style.position = "absolute",
		t.style.left = "0",
		t.style.top = "0",
		t.style.backgroundColor = "#000";
		try {
			t.style.backgroundColor = "rgba(0,0,0,.6)"
		} catch(a) {}
		t.style.zIndex = 9999,
		e.appendChild(t),
		i = document.createElement("div"),
		i.style.width = "375px",
		i.style.height = "150px",
		i.style.textAlign = "center",
		i.style.position = "absolute",
		i.style.left = "30%",
		i.style.top = "30%",
		i.style.border = "1px solid #4a9ad5",
		i.style.backgroundColor = "#fff",
		i.style.zIndex = 1e4,
		tmpDiv = document.createElement("div"),
		tmpDiv.style.padding = "10px",
		i.appendChild(tmpDiv),
		r = document.createElement("h3"),
		r.innerHTML = "目前的IE配置地图不能正常运行，请下载运行此脚本！完成后请重启浏览器！",
		tmpDiv.appendChild(r),
		o = document.createElement("a"),
		o.style.marginRight = "10px",
		o.style.background = "#ddd",
		o.style.border = "1px #000 solid",
		o.style.textDecoration = "none",
		o.style.color = "#000",
		o.style.display = "inline-block",
		o.style.height = "22px",
		o.style.width = "50px",
		o.style.fontSize = "15px",
		o.style.lineHeight = "22px",
		o.innerHTML = "下载",
		o.href = "http://10.70.194.131/gis/IE_modify.bat",
		tmpDiv.appendChild(o),
		o = document.createElement("button"),
		o.style.marginRight = "30px",
		o.innerHTML = "点击关闭",
		o.onclick = function() {
			e.removeChild(t),
			e.removeChild(i)
		},
		tmpDiv.appendChild(o),
		e.appendChild(i)
	}
	try {
		i(function() {
			t(e)
		})
	} catch(o) {
		var a = setInterval(function() {
			var e = document.getElementsByTagName("body")[0];
			e && (r(e), clearInterval(a))
		},
		50)
	}
} (window,
function($wd) {
	function isFunction(e) {
		return e && "[object Function]" === Object.prototype.toString.call(e)
	}
	function getFnName(e) {
		return isFunction(e) ? e.name || e.toString().match(/function\s*([^(]*)\(/) : ""
	}
	function loadExtentFile(e, t) {
		var i = e.substring(e.lastIndexOf("/") + 1),
		r = document.getElementById(i);
		if (r) return r;
		if ("js" == t) {
			var o = document.createElement("script");
			return o.setAttribute("id", i),
			o.setAttribute("type", "text/javascript"),
			o.setAttribute("src", e),
			document.getElementsByTagName("head")[0].appendChild(o),
			o
		}
		if ("css" == t) {
			var a = document.createElement("link");
			return a.setAttribute("id", i),
			a.setAttribute("rel", "stylesheet"),
			a.setAttribute("type", "text/css"),
			a.setAttribute("href", e),
			document.getElementsByTagName("head")[0].appendChild(a),
			a
		}
	}
	function _init_Gis_NormalMap(e) {
		function t() {
			require(["esri/map", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleMarkerSymbol"],
			function(t, r, o, a) {
				_mapObject && (_mapObject.removeAllLayers(), _mapObject.destroy()),
				_mapObject = new t(e.divID, {
					logo: !1,
					slider: !0,
					sliderStyle: "large",
					maxZoom: 16
				}),
				i < 0 ? _mapObject.setZoom(0) : i > 16 ? _mapObject.setZoom(16) : _mapObject.setZoom(i),
				_gis_BDVector = _utils.addLayerFun("Vector", !0),
				_gis_BDVector_t = _utils.addLayerFun("Vector", !0, !0, e.thematicType),
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
				var n = new o({
					style: "solid",
					color: new esri.Color([255, 255, 255, 1]),
					width: 1
				});
				_mapObject.infoWindow.fillSymbol = new r({
					color: new esri.Color([47, 169, 204, .8]),
					outline: n,
					style: "solid"
				}),
				_mapObject.infoWindow.lineSymbol = n,
				_mapObject.infoWindow.markerSymbol = new a({
					color: new esri.Color([0, 0, 0, 0]),
					outline: new o({
						color: new esri.Color([255, 255, 255, 0])
					}),
					size: 1
				}),
				e.thematicMap ? (_gis_BDVector.setVisibility(!1), _gis_BDVector_t.setVisibility(!0)) : (_gis_BDVector.setVisibility(!0), _gis_BDVector_t.setVisibility(!1)),
				_gis_BDImage.setVisibility(!1),
				_gis_BDPoi.setVisibility(!1),
				__gis_initListener(),
				_gis_mapWaitFlag = !0
			})
		}
		_gis_mapWaitFlag = !1;
		var i = Number(e.level);
		BDLTool.initb_rs(),
		BDLTool.initb_th();
		var r = function() {
			_gis_funcWaitFlag1 && _gis_funcWaitFlag2 ? t() : setTimeout(r, 50)
		};
		r()
	}
	function __gis_initListener() {
		function e(e, t) {
			var i = e.geometry,
			r = e.symbol,
			o = new Object;
			r.url ? (o.height = r.height, o.width = r.width, o.source = r.url) : (o.color = r.color, "object" == typeof o.color && (o.color = "0x" + _utils.rgbToHexString(o.color.r, o.color.g, o.color.b), o.color = Number(o.color), o.alpha = r.color.a), "string" == typeof o.color && o.color.startsWith("#") && (o.color = o.color.replace("#", "0x"), o.color = Number(o.color)), o.outline = new Object, "object" == typeof r.outline.color && (o.outline.color = "0x" + _utils.rgbToHexString(r.outline.color.r, r.outline.color.g, r.outline.color.b), o.outline.color = Number(o.outline.color), o.outline.alpha = r.outline.color.a), "string" == typeof o.outline.color && o.outline.color.startsWith("#") && (o.outline.color = o.outline.color.replace("#", "0x"), o.outline.color = Number(o.outline.color)), (r.alpha || 0 == r.alpha) && (o.alpha = r.alpha), r.style && (o.style = r.style), (r.size || 0 == r.size) && (o.size = r.size), (r.outline.alpha || 0 == r.outline.alpha) && (o.outline.alpha = r.outline.alpha), r.outline.style && (o.outline.style = r.outline.style), (r.outline.width || 0 == r.outline.width) && (o.outline.width = r.outline.width)),
			o.html = e.attributes.newcontent,
			o.type = i.type;
			for (var a in i.userAttr) o[a] = i.userAttr[a];
			o.mapEventType = t,
			o.id = e.attributes.id;
			var n = _utils.convertPoint(i.x, i.y, 16);
			return o.x = n.x,
			o.y = n.y,
			o
		}
		var t, i, r, o;
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
			s = n.attributes.canShowTip;
			if (s) {
				var l = new Object({
					width: 200,
					height: 200,
					title: "",
					content: n.attributes.newcontent,
					graphic: n
				});
				_utils.infoWindowOpen(l)
			}
			var c = n.attributes.canDrag;
			c ? (i = !0, t && (t.deactivate(), t = null), t = new _utils._gis_Edit(_mapObject), t.activate(_utils._gis_Edit.MOVE, n), o && (dojo.disconnect(o), o = null), o = dojo.connect(t, "onGraphicMove",
			function(t) {
				if (_utils._gis_PointDrag.dragFlag) {
					var i = e(t, "MapEvent_PointMarkerDragging"),
					r = _utils._gis_PointDrag.callBackFn;
					_utils.callbackFuncRun(r, i)
				}
			}), r && (dojo.disconnect(r), r = null), r = dojo.connect(t, "onGraphicMoveStop",
			function(o) {
				if (null != t && (i = !1, t.deactivate(), t = null), dojo.disconnect(r), r = null, _utils._gis_PointDrag.dragEndFlag) {
					var a = e(o, "MapEvent_PointMarkerDragEnd"),
					n = _utils._gis_PointDrag.callBackFnEnd;
					_utils.callbackFuncRun(n, a)
				}
				_mapObject.enableMapNavigation()
			})) : t && (t.deactivate(), t = null)
		}),
		dojo.connect(_mapObject, "onClick",
		function(e) {
			0 == i && (null != t && (t.deactivate(), t = null), _mapObject.enableMapNavigation())
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
		this.SATELLITE = "satellite",
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
		}
	}
	function UtilsForGis(_gis) {
		var _utils = this;
		return this._gisXmlHttpRequest,
		this._gis_Edit,
		this._gis_PointDrag = {
			dragFlag: !1,
			dragEndFlag: !1,
			callBackFn: null,
			callBackFnEnd: null
		},
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
				x: 120.1254115,
				y: 30.2619342,
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
				x: 119.955659,
				y: 30.0513758,
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
				x: 120.8998319,
				y: 29.502652,
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
				x: 120.8266548,
				y: 29.564218,
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
				x: 120.6875002,
				y: 28.1569104,
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
		this.stfg = null,
		this.thCurrentType = null,
		this.transformPoint = !1,
		this.version = "1.1703271642",
		this._initGis = function() {
			function e(e) {
				var i = JSON.parse(e);
				if (t = i.verifyFlag, 1 == t) {
					var r = i.message;
					businessLayerManager = r.appSysLevel,
					_utils.initLayerUrls(r.list)
				}
			}
			var t = 0,
			i = _utils.RSAUtils.encryptedString(_utils.publicKey, _gis.appSysKey);
			_utils.appSysKey = i,
			_utils.encrypted = !0;
			var r = "appSysKey=" + i,
			o = url_gis_mng + "sm/login/LoginController/verify.do";
			_utils._gisRequest(o, !1, r, e);
			var a = dojo.byId(_gis.divID),
			n = a.offsetHeight;
			0 == n && (n = a.style.height.endsWith("%") ? parseInt(a.style.height.replace("%", "")) * dojo.window.getBox().h / 100 : dojo.window.getBox().h);
			var s = a.offsetWidth;
			if (0 == s && (s = a.style.height.endsWith("%") ? parseInt(a.style.width.replace("%", "")) * dojo.window.getBox().w / 100 : dojo.window.getBox().w), _gis.height.indexOf("%") != -1) {
				var l = parseInt(_gis.height.substring(0, _gis.height.indexOf("%")));
				dojo.style(a, "height", n * l / 100 + "px")
			} else _gis.height.indexOf("px") != -1 ? dojo.style(a, "height", _gis.height) : isNaN(_gis.height) ? dojo.style(a, "height", "100%") : dojo.style(a, "height", _gis.height + "px");
			if (_gis.width.indexOf("%") != -1) {
				var l = parseInt(_gis.width.substring(0, _gis.width.indexOf("%")));
				dojo.style(a, "width", s * l / 100 + "px")
			} else _gis.width.indexOf("px") != -1 ? dojo.style(a, "width", _gis.width) : isNaN(_gis.width) ? dojo.style(a, "width", "100%") : dojo.style(a, "width", _gis.width + "px");
			if (0 == t) return alert("授权失败，应用没有权限访问地图，请检查授权码"),
			void(_utils = null);
			_init_Gis_NormalMap(_gis);
			var c = function() {
				if (_gis.districtName) {
					var e = _gis.districtNameToPointMap[_gis.districtName.replace("市", "")];
					if (e) {
						var t = new esri.geometry.Point(e.x, e.y, _mapObject.spatialReference);
						_mapObject.centerAt(t)
					}
				} else _gis.centerPoint ? _gis.setMapCenter(_gis.centerPoint) : _gis.extent && _gis.setMapExtent(_gis.extent)
			},
			d = function() {
				if (_gis_mapWaitFlag) {
					c(),
					_gis.modouleConfig || _gis.setModuleShow(),
					_utils.hideLoadingUniversal("loadingStatus");
					var e = _gis.mapLoadListenerFunctionName;
					require(["esri/toolbars/edit", "dojo/domReady!"],
					function(t) {
						_utils._gis_Edit = t,
						_utils.callbackFuncRun(e)
					})
				} else setTimeout(d, 50)
			};
			d()
		},
		this._gisRequestGet = function(url, asyn, callBackFun) {
			this._gisXmlHttpRequest = this.createXmlHttpRequest(),
			this._gisXmlHttpRequest.onreadystatechange = eval(callBackFun),
			this._gisXmlHttpRequest.open("GET", url, asyn),
			this._gisXmlHttpRequest.send(null)
		},
		this._gisRequest = function(e, t, i, r, o) {
			var a = o,
			n = this.createXmlHttpRequest();
			if (n.onreadystatechange = function() {
				4 == n.readyState && 200 == n.status && r && r(n.responseText)
			},
			a || (a = "POST"), n.open(a, e, t), n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8"), n.send(i), 0 == t && 4 == n.readyState && 200 == n.status) return r && r(n.responseText),
			n.responseText
		},
		this.addEcllipseFun = function(e) {
			var t = e.id;
			if (e && !isNaN(e.x) && !isNaN(e.y)) {
				var i = _utils.convertPoint(e.x, e.y, 11),
				r = i.x,
				o = i.y,
				a = e.width,
				n = e.height,
				s = e.widthForEllipseFrame,
				l = e.colourForEllipseFrame,
				c = e.alphaForEllipseFrame,
				d = e.colorForEllipse,
				u = e.alphaForEllipse,
				p = e.layer ? e.layer: mapEllipseLayer,
				y = _utils.getRingsByPointAndWH(r, o, 2 * a, 2 * n),
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
				0 == u || "0" == u ? h.setStyle(esri.symbol.SimpleLineSymbol.STYLE_NULL) : h.setColor(_utils.hexToRgbObject(d, u));
				var _ = new esri.symbol.SimpleLineSymbol;
				_.setColor(_utils.hexToRgbObject(l, c)),
				isNaN(s) || _.setWidth(s),
				h.setOutline(_),
				g.setSymbol(h),
				p.add(g)
			}
		},
		this.addInternalLayer = function(e, t, i, r) {
			if (e) {
				var o = _mapObject.getLayer(e);
				if (o) o.show();
				else {
					if (2 == r) return o = this.addInternalLayerWithProp(e, t, i, !0);
					1 == r ? (o = _utils.addLayerFun(e, !1, t, "featureLayer", i), isNaN(i.opacity) || o.setOpacity(Number(i.opacity))) : (o = _utils.addLayerFun(e, !1, t), o.setOpacity(.6))
				}
				return o.setVisibility(!0),
				e == coverareadistUrl && _mapObject.reorderLayer(coverareadistUrl, 3),
				o
			}
		},
		this.addInternalLayerWithProp = function(e, t, i, r) {
			if (t) {
				if (("string" == typeof r && "" == r || null == r) && (r = !0), !_mapObject.getLayer(e)) {
					var o = new esri.layers.FeatureLayer(t, {
						id: e
					});
					if (null != i) {
						var a = new esri.symbol.SimpleLineSymbol,
						n = new esri.symbol.SimpleFillSymbol;
						i.lineStyle && a.setStyle(i.lineStyle),
						a.setColor(this.hexToRgbObject(i.lineColor, i.lineAlpha)),
						isNaN(i.lineWidth) || a.setWidth(i.lineWidth),
						n.setOutline(a),
						0 == i.alpha || "0" == i.alpha ? n.setStyle("none") : (i.style && n.setStyle(i.style), n.setColor(this.hexToRgbObject(i.color, i.alpha)));
						var s = new esri.renderer.SimpleRenderer(n);
						o.setRenderer(s)
					}
					return o.setVisibility(r),
					_mapObject.addLayer(o),
					o
				}
				return null
			}
		},
		this.addHeatMapLayer = function(e, t, i, r) {
			if (null != t && "" != t && t.startsWith("http")) {
				null != e && "" != e || (e = t),
				("string" == typeof r && "" == r || null == r) && (r = !0);
				var o = _mapObject.getLayer(e);
				if (!o) {
					var a = new esri.layers.FeatureLayer(t, {
						id: e,
						mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
						outFields: ["*"]
					}),
					n = new esri.renderer.HeatmapRenderer;
					if (!i.field) return;
					if (n.setField(i.field), i.colorStops) n.setColorStops(i.colorStops);
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
						n.setColorStops(s)
					}
					return i.blurRadius ? n.setBlurRadius(i.blurRadius) : n.setBlurRadius(8),
					i.maxPixelIntensity ? n.setMaxPixelIntensity(i.maxPixelIntensity) : n.setMaxPixelIntensity(1e5),
					i.minPixelIntensity ? n.setMinPixelIntensity(i.minPixelIntensity) : n.setMinPixelIntensity(0),
					a.setRenderer(n),
					a.setVisibility(r),
					_mapObject.addLayer(a),
					a
				}
				o.show()
			}
		},
		this.addLabel2Map = function(e, t) {
			var i = new Array;
			if (e && !Array.isArray(e)) e = [e];
			else if (!e || e.length && 0 == e.length) return;
			_utils.moveXY(i, e),
			_utils.moveXY(e, this.convertPoints(e, 17));
			for (var r = 0; r < e.length; r++) {
				var o = new esri.Graphic,
				a = new esri.geometry.Point(e[r].x, e[r].y, _mapObject.spatialReference);
				o.setGeometry(a),
				o.setAttributes({
					id: e[r].id
				});
				var n = new esri.symbol.TextSymbol(e[r].label);
				n.setColor(_utils.hexToRgbObject(t.color, t.alpha)),
				isNaN(t.fontSize) || n.setFont(new esri.symbol.Font(t.fontSize)),
				isNaN(t.angle) || n.setAngle(t.angle),
				o.setSymbol(n),
				mapLabelOverLayer.add(o)
			}
			_utils.moveXY(e, i)
		},
		this.addLayer = function(e, t, i, r) {
			isNaN(i) && (i = 1),
			"false" == t && 0 == t && "true" == t && 1 == t || (t = !0),
			null != r && "" != r || (r = e);
			var o = _mapObject.getLayer(r);
			return o || (o = new esri.layers.ArcGISDynamicMapServiceLayer(e, {
				id: r
			}), o.setVisibility(t), o.setOpacity(i), _mapObject.addLayer(o)),
			o
		},
		this.addLayerFun = function(e, t, i, r, o) {
			var a = _mapObject.getLayer(e);
			if (!a) {
				if (t) arguments[2] ? (a = new BaiduLayer_Thematic(e, arguments[3]), a.attr("id", e + "_them")) : (a = new BaiduLayer(e), a.attr("id", e));
				else if (i) if ("featureLayer" == r) {
					var n = new Object({
						id: e
					});
					o.outFields && (n.outFields = o.outFields),
					o.mode && (n.mode = o.mode),
					o.orderByFields && (n.orderByFields = o.orderByFields),
					o.refreshInterval && (n.refreshInterval = o.refreshInterval),
					o.infoTemplate && (n.infoTemplate = o.infoTemplate),
					o.visible && (n.visible = o.visible),
					a = new esri.layers.FeatureLayer(i, n),
					o.definition && a.setDefinitionExpression(o.definition)
				} else a = new esri.layers.ArcGISDynamicMapServiceLayer(i, {
					id: e
				});
				else a = new esri.layers.GraphicsLayer({
					id: e
				});
				_mapObject.addLayer(a)
			}
			return a
		},
		this.addPoint2Map = function(e, t, i) {
			var r = new esri.Graphic,
			o = new esri.geometry.Point(e.x, e.y, _mapObject.spatialReference);
			r.setGeometry(o),
			o.userAttr = new Object;
			for (var a in e)"x" != a && "y" != a && (o.userAttr[a] = e[a]);
			if (e.source) {
				var n = new Image;
				if (n.src = e.source, n.complete) {
					var s = new esri.symbol.PictureMarkerSymbol(n.src, n.width, n.height);
					r.setSymbol(s),
					mapPointOverLayer.add(r)
				} else n.tGraphic = r,
				n.onload = function() {
					var e = new esri.symbol.PictureMarkerSymbol(this.src, this.width, this.height);
					this.tGraphic.setSymbol(e),
					mapPointOverLayer.add(this.tGraphic)
				}
			} else {
				var l = new esri.symbol.SimpleMarkerSymbol;
				l.setColor(_utils.hexToRgbObject(t.color, t.alpha)),
				t.style && l.setStyle(t.style),
				isNaN(t.size) || l.setSize(t.size);
				var c = new esri.symbol.SimpleLineSymbol;
				c.setColor(_utils.hexToRgbObject(i.color, i.alpha)),
				i.style && c.setStyle(i.style),
				isNaN(i.width) || c.setWidth(i.width),
				l.setOutline(c),
				r.setSymbol(l),
				mapPointOverLayer.add(r)
			}
		},
		this.addPoints2Map = function(e, t, i) {
			for (var r = 0; r < e.length; r++) {
				var o = e[r];
				if (!isNaN(o.x) && !isNaN(o.y)) {
					var a = new esri.Graphic;
					a.setAttributes({
						newcontent: o.html,
						id: o.id
					}),
					"true" != o.canShowTip && 1 != o.canShowTip || (a.attributes.canShowTip = !0),
					"true" != o.canDrag && 1 != o.canDrag || (a.attributes.canDrag = !0);
					var n = new esri.geometry.Point(o.x, o.y, _mapObject.spatialReference);
					a.setGeometry(n),
					n.userAttr = new Object;
					for (var s in o)"x" != s && "y" != s && (n.userAttr[s] = o[s]);
					if (o.source) {
						var l = new Image;
						if (l.src = o.source, l.complete) {
							var c = new esri.symbol.PictureMarkerSymbol(l.src, l.width, l.height);
							a.setSymbol(c),
							mapPointOverLayer.add(a)
						} else l.tGraphic = a,
						l.onload = function() {
							var e = new esri.symbol.PictureMarkerSymbol(this.src, this.width, this.height);
							this.tGraphic.setSymbol(e),
							mapPointOverLayer.add(this.tGraphic)
						}
					} else {
						var d = new esri.symbol.SimpleMarkerSymbol;
						d.setColor(_utils.hexToRgbObject(t.color, t.alpha)),
						t.style && d.setStyle(t.style),
						isNaN(t.size) || d.setSize(t.size);
						var u = new esri.symbol.SimpleLineSymbol;
						u.setColor(_utils.hexToRgbObject(i.color, i.alpha)),
						i.style && u.setStyle(i.style),
						isNaN(i.width) || u.setWidth(i.width),
						d.setOutline(u),
						a.setSymbol(d),
						mapPointOverLayer.add(a)
					}
				}
			}
		},
		this.bdPoiClickEvent = function() {
			var e = dojo.attr(this, "poiid"),
			t = "poi_" + e,
			i = Number(dojo.attr(this, "detail")),
			r = dojo.attr(this, "x"),
			o = dojo.attr(this, "y"),
			a = 1 == _gis.modouleConfig.searchResultShow;
			if (a && !_utils.hasPoint(t)) {
				var n = new Object({
					x: r,
					y: o,
					id: t,
					source: url_image + "mappins/pin" + this.countNo + ".png",
					canShowTip: !0
				});
				_gis.addPointMarkers([n], {},
				{},
				14),
				_utils.stfg.getIdArray().push(t)
			}
			if (1 == i) {
				var s = new Object({
					poiId: e,
					scope: 2
				});
				_gis.searchAddress_Detail(s,
				function(e) {
					var i, a = e.result,
					n = "";
					a.name && (n += "<p>信息点 : " + a.name + "</p>\n"),
					a.address && (n += "<p>地址 : " + a.address + "</p>\n"),
					a.telephone && (n += "<p>电话 : " + a.telephone + "</p>\n"),
					a.detail_info && (a.detail_info.tag && (n += "<p>标签 : " + a.detail_info.tag + "</p>\n"), a.detail_info.indoor_floor && (n += "<p>所在楼层 : " + a.detail_info.indoor_floor + "</p>\n"), a.detail_info.detail_url && (n += '<p><a href="' + a.detail_info.detail_url + '" target="_blank">详情页面</a></p>\n')),
					n += "<p>数据来源：百度POI</p>",
					i = dojo.create("span"),
					dojo.style(i, {
						display: "block"
					}),
					dojo.place(n, i),
					_utils.setContentById(t, i),
					_gis.showTipOfPointMarker_set(t, i, !0, 260, 300),
					_gis.setMapCenter({
						x: r,
						y: o,
						type: 12
					})
				})
			} else {
				var l = dojo.attr(dojo.query("._gis-search-item-name", this)[0], "innerHTML");
				_gis.showTipOfPointMarker(t, l, !0),
				_gis.setMapCenter({
					x: r,
					y: o,
					type: 12
				})
			}
		},
		this.callbackFuncRun = function(cFunc, param) {
			var ftype = typeof cFunc; ! cFunc || "string" != ftype && "function" != ftype || "" == cFunc || ("string" == ftype ? cFunc.endsWith("()") ? eval(cFunc.substring(0, cFunc.lastIndexOf(")")) + JSON.stringify(param) + ")") : eval(cFunc + "(" + JSON.stringify(param) + ")") : "function" == ftype && cFunc(param))
		},
		this.changeCustRangeMarker = function(e, t, i) {
			var r;
			require(["esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", "esri/renderers/ClassBreaksRenderer", "esri/renderers/UniqueValueRenderer", "esri/Color"],
			function(o, a, n, s, l, c) {
				var d = _utils.hexToRgbObject(t.color, t.alpha),
				u = _utils.hexToRgbObject(t.lineColor, t.lineAlpha);
				if ("point" == t.layerStyle) {
					var p = new n;
					p.setColor(u),
					isNaN(t.lineWidth) || p.setWidth(t.lineWidth),
					t.lineStyle && p.setStyle(t.lineStyle);
					var y = (new o).setColor(d);
					isNaN(t.size) || y.setSize(t.size),
					t.style && y.setStyle(t.style),
					y.setOutline(p),
					"uniqueValue" == t.render && (r = new l(y, t.filed)),
					"classBreaks" == t.render && (r = new s(y, t.filed));
					for (var m = 0; m < i.length; m++) {
						var g = new o,
						h = new n;
						i[m].lineStyle && h.setStyle(i[m].lineStyle),
						h.setColor(_utils.hexToRgbObject(i[m].lineColor, i[m].lineAlpha)),
						isNaN(i[m].lineWidth) || h.setWidth(i[m].lineWidth),
						isNaN(i[m].size) || g.setSize(i[m].size),
						i[m].style && g.setStyle(i[m].style),
						g.setColor(_utils.hexToRgbObject(i[m].color, i[m].alpha)),
						g.setOutline(h),
						"uniqueValue" == t.render && r.addValue(i[m].value, g),
						"classBreaks" == t.render && r.addBreak(i[m].minValue, i[m].maxValue, g)
					}
				} else if ("polygon" == t.layerStyle) {
					var _ = new n;
					_.setColor(u),
					t.lineStyle && _.setStyle(t.lineStyle),
					isNaN(t.lineWidth) || _.setWidth(t.lineWidth);
					var b = new a;
					0 == t.alpha || "0" == t.alpha ? b.setStyle("none") : (b.setColor(d), t.style && b.setStyle(t.style)),
					b.setOutline(_),
					"uniqueValue" == t.render && (r = new l(b, t.filed)),
					"classBreaks" == t.render && (r = new s(b, t.filed));
					for (var m = 0; m < i.length; m++) {
						var v = new a,
						h = new n;
						i[m].lineStyle && h.setStyle(i[m].lineStyle),
						h.setColor(_utils.hexToRgbObject(i[m].lineColor, i[m].lineAlpha)),
						isNaN(i[m].lineWidth) || h.setWidth(i[m].lineWidth),
						i[m].style && v.setStyle(i[m].style),
						0 == i[m].alpha || "0" == i[m].alpha ? v.setStyle("none") : (v.setColor(_utils.hexToRgbObject(i[m].color, i[m].alpha)), v.setOutline(h)),
						"uniqueValue" == t.render && r.addValue(i[m].value, v),
						"classBreaks" == t.render && r.addBreak(i[m].minValue, i[m].maxValue, v)
					}
				}
				e.setRenderer(r),
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
			return this._gisRequest(url, !1, sendData,
			function(responseText) {
				var str1 = eval("(" + responseText + ")");
				point.x = str1.x,
				point.y = str1.y,
				_utils.callbackFuncRun(callFunc, point)
			}),
			point
		},
		this.convertPoints = function(points, type, callFunc) {
			var longlatStr = function(e, t) {
				var i = "";
				if (e.length > 0) {
					for (var r = 0; r < e.length; r++) 14 != t && 13 != t || (i += e[r].label ? e[r].label + "," + e[r].x + "," + e[r].y + ";": "_," + e[r].x + "," + e[r].y + ";"),
					i += e[r].x + "," + e[r].y + ";";
					i = i.substr(0, i.length - 1)
				}
				return i
			} (points, type),
			pointsUrl = url_prefix + "gisintf/gis/coord/CoordController/coordCorrect.do?token=21218CCA77804D2BA1922C33E0151105";
			if (!this.transformPoint) return points;
			type || (type = 17);
			var sendData = "LonLatStr=" + longlatStr + "&type=" + type,
			returnStr = {},
			resData = {};
			return this._gisRequest(pointsUrl, !1, sendData,
			function(responseText) {
				returnStr = eval("(" + responseText + ")"),
				_utils.callbackFuncRun(callFunc, returnStr.list)
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
			require(["dojo/dom-class", "dojo/on"],
			function(i, r) {
				i.add(e, "_gis_MeasureWidget"),
				i.add(t, "_gis_MeasureBtn"),
				r(t, "click",
				function() {
					_gis.gisToolBar.drawMeasureGraphic()
				})
			})
		},
		this.editStyleToLayer = function(e, t, i, r) {
			var o;
			"string" == typeof e ? o = _mapObject.getLayer(e) : "object" == typeof e && e.declaredClass.indexOf("layers") != -1 && (o = e),
			o && (_utils.showMapLoading(), require(["esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleMarkerSymbol", "esri/renderers/SimpleRenderer", "esri/Color"],
			function(e, a, n, s, l) {
				var c = null,
				d = null;
				if ("polygon" == i ? (c = new e, d = new a) : "line" == i ? c = new a: (c = new n, d = new a), !isNaN(t.size) && c.setSize && c.setSize(t.size), "polygon" == i && 0 == t.alpha || "0" == t.alpha) c.setStyle("none");
				else if (t.style && c.setStyle(t.style), 0 == t.color || t.color) {
					var u;
					u = "object" == typeof t.color ? t.color: _utils.hexToRgbObject(t.color, t.alpha),
					c.setColor(u)
				} else c.setColor(new l([77, 154, 213, t.alpha ? t.alpha: 1]));
				if (null != d && null != t.lineAttr) {
					if (isNaN(t.lineAttr.width) || d.setWidth(t.lineAttr.width), t.lineAttr.style && d.setStyle(t.lineAttr.style), 0 == t.lineAttr.color || t.lineAttr.color) {
						var p;
						p = "object" == typeof t.lineAttr.color ? t.lineAttr.color: _utils.hexToRgbObject(t.lineAttr.color, t.lineAttr.alpha),
						d.setColor(p)
					} else d.setColor(new l([255, 255, 255, t.lineAttr.alpha ? t.lineAttr.alpha: 1]));
					c.setOutline(d)
				}
				var y = new s(c);
				o.setRenderer(y),
				o.redraw(),
				r && _utils.saveRenderer(o.id, t)
			}))
		},
		this.formatPoiData = function(e, t) {
			var i = e.total ? e.total: 0,
			r = 0 == e.status ? "success": "false",
			o = e.results,
			a = new Array;
			e.results[0] && e.results[0].location || (o = [], i = o.length);
			for (var n = 0; n < o.length; n++) a[n] = new Object,
			a[n].formatted_address = o[n].address,
			a[n].name = o[n].name,
			a[n].lng = Number(o[n].location.lng),
			a[n].lat = Number(o[n].location.lat),
			a[n].accurate_type = 1 == o[n].detail ? 0 : 1,
			a[n].uid = o[n].uid,
			a[n].telephone = o[n].telephone;
			var s = new Object({
				count: i,
				results: a,
				status: r
			});
			return s
		},
		this.formatPoiData_forSearchBar = function(e, t) {
			var i = e.total ? e.total: 0,
			r = e.status ? e.status: 0,
			o = Number(_utils.stfg.getPageSize()),
			a = e.results,
			n = new Array;
			e.results[0] && e.results[0].location || (a = [], i = a.length);
			for (var s = 0; s < a.length; s++) n[s] = new Object,
			n[s].detail = a[s].detail,
			n[s].datatype = "百度POI",
			n[s].fullname = a[s].address,
			n[s].id = a[s].uid,
			n[s].name = a[s].name,
			a[s].detail && a[s].detail_info && a[s].detail_info.tag && (n[s].type = a[s].detail_info.tag),
			n[s].x = a[s].location.lng,
			n[s].y = a[s].location.lat;
			var l = t ? t + 1 : 1,
			c = new Object({
				total: i,
				status: r,
				page: l,
				rows: n,
				pagetotal: parseInt(i / o) + (i % o == 0 ? 0 : 1)
			});
			return c
		},
		this.getBDApiData = function(e, t, i) {
			var r = new Object;
			for (var o in t) r[o] = t[o];
			r.output = "json",
			r.ak = "baKTjPT964BlCLU6sf6IgsNohlaiEy7B",
			require(["dojo/io/script"],
			function(t) {
				var o = {
					url: e,
					callbackParamName: "callback",
					content: r,
					load: function(e) {
						i(e)
					},
					error: function(e) {
						console.log(e)
					}
				};
				t.get(o)
			})
		},
		this.getGisObject = function() {
			return _gis
		},
		this.getLayerUrl = function(e) {
			return bizLayer.length && 0 != bizLayer.length ? e.startsWith("_CELL_FLOW_HEAT") ? url_mapSvr_zj + "CELL_FLOW_HEAT/MapServer": "061_demo_layer" == e ? _061Url: bizLayer[e] ? bizLayer[e].url: void 0 : void console.log("获取图层地址服务失败")
		},
		this.getRingsByPointAndWH = function(e, t, i, r) {
			for (var o = Number(e), a = Number(t), n = [], s = i / 2, l = r / 2, c = 0; c < 31; c++) {
				var d = o - i / 2 + i / 30 * c;
				n.push([d, a + l * Math.sqrt(1 - (d - o) * (d - o) / (s * s))])
			}
			for (var c = 29; c >= 0; c--) {
				var d = o - i / 2 + i / 30 * c;
				n.push([d, a - l * Math.sqrt(1 - (d - o) * (d - o) / (s * s))])
			}
			return n
		},
		this.getRenderer = function(e) {
			if (e) {
				var t;
				return require(["dojo/request/xhr"],
				function(i) {
					i("../styledemo/queryStyle.do", {
						handleAs: "json",
						data: {
							layerid: e
						},
						method: "POST",
						sync: !0
					}).then(function(e) {
						if (null != e.info.STYLE && "" != e.info.STYLE) {
							var i = JSON.parse(e.info.STYLE);
							t = i
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
			var i, r, o, a, n, s, l, c = Number(e.y),
			d = Number(e.x),
			u = Number(t.y),
			p = Number(t.x),
			y = function(e) {
				return e * Math.PI / 180
			},
			m = y((c + u) / 2),
			g = y((c - u) / 2),
			h = y((d - p) / 2),
			_ = Math.sin(g),
			b = Math.sin(h),
			v = Math.sin(m),
			f = 6378137,
			S = f,
			L = 1 / 298.257;
			return c == u && d == p ? 0 : (_ *= _, b *= b, v *= v, i = _ * (1 - b) + (1 - v) * b, r = (1 - _) * (1 - b) + v * b, o = Math.atan(Math.sqrt(i / r)), a = Math.sqrt(i * r) / o, n = 2 * o * S, s = (3 * a - 1) / 2 / r, l = (3 * a + 1) / 2 / i, h = n * (1 + L * (s * v * (1 - _) - l * (1 - v) * _)), String(h))
		},
		this.hasPoint = function(e) {
			for (var t = mapPointOverLayer.graphics,
			i = 0; i < t.length; i++) if (t[i].attributes.id == e) return ! 0;
			return ! 1
		},
		this.hexToRgbObject = function(e, t) {
			var i, r = !isNaN(t) && t <= 1 && t >= 0 ? t: 1,
			o = 0,
			a = 0,
			n = 0;
			if (isNaN(e) ? "string" == typeof e && e.startsWith("#") && (i = e.substring(1), isNaN(parseInt(i, 16)) && (i = null)) : i = e.toString(16).replace("0x", ""), null == i || i.length > 6) return new esri.Color([o, a, n, r]);
			if (i.length < 6) for (var s = i.length; s < 6; s++) i = "0" + i;
			return o = parseInt(i.substring(0, 2), 16),
			a = parseInt(i.substring(2, 4), 16),
			n = parseInt(i.substring(4, 6), 16),
			new esri.Color([o, a, n, r])
		},
		this.hideLayer = function(e) {
			var t = _mapObject.getLayer(e);
			return !! t && (t.hide(), !0)
		},
		this.hideLoadingUniversal = function(e) {
			var t = dojo.byId(e);
			t && require(["dojo/dom-construct"],
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
					var i = new esri.geometry.Point(e.x, e.y, _mapObject.spatialReference);
					t.show(i)
				}
			}
		},
		this.initLayerUrls = function(e) {
			var t, i = 0;
			if (bizLayer = bizLayer || {},
			bizLayer.length = 0, !(e.length <= 0)) for (i; i < e.length; i++) t = e[i].id,
			bizLayer[t] = {
				type: e[i].type,
				url: e[i].url,
				option: e[i].option
			},
			bizLayer.length = i + 1
		},
		this.moveXY = function(e, t) {
			if (Array.isArray(e) && Array.isArray(t)) {
				for (var i = 0; i < t.length; i++) e[i] || (e[i] = new Object),
				e[i].x = t[i].x,
				e[i].y = t[i].y;
				e.length = t.length
			}
		},
		this.parseSingleRing = function(e, t, i) {
			for (var r = _utils.convertPoints(e, t), o = new Array, a = 0; a < r.length; a++) {
				var n = new Array;
				n.push(parseFloat(r[a].x)),
				n.push(parseFloat(r[a].y)),
				o.push(n)
			}
			return o
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
		this.removeGraphic = function(e, t) {
			var i = t.graphics;
			if (Array.isArray(e)) for (var r = 0; r < e.length; r++) for (var o = 0; o < i.length; o++) i[o].attributes.id == e[r] && t.remove(i[o]);
			else for (var o = 0; o < i.length; o++) i[o].attributes.id == e && t.remove(i[o])
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
		this.rgbToHexString = function(e, t, i) {
			if (!isNaN(e) && !isNaN(t) && !isNaN(i)) return ("00000" + (e << 16 | t << 8 | i).toString(16)).slice( - 6)
		},
		this.saveRenderer = function(e, t) {
			var i = JSON.stringify(t);
			require(["dojo/request/xhr"],
			function(t) {
				t("../styledemo/updateStyle.do", {
					handleAs: "json",
					data: {
						layerid: e,
						style: i
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
		this.setLayerSettings = function(e, t) {
			t && e && (isNaN(t.opacity) || e.setOpacity(Number(t.opacity)), isNaN(t.maxScale) || e.setMaxScale(Number(t.maxScale)), isNaN(t.minScale) || e.setMinScale(Number(t.minScale)), 0 == t.isVisible && e.setVisibility(!1), isNaN(t.interval) || e.setRefreshInterval(Number(t.interval)), t.definition && e.setDefinitionExpression && e.setDefinitionExpression(t.definition), t.isEditable && e.setEditable && e.setEditable(t.isEditable), t.timeDefinition && e.setTimeDefinition && e.setTimeDefinition(t.timeDefinition))
		},
		this.setTransformPoint = function(e) {
			this.transformPoint = e
		},
		this.setContentById = function(e, t, i) {
			var r;
			if (r = "line" == i ? mapLineOverLayer.graphics: "polygon" == i ? mapPolygonOverLayer.graphics: mapPointOverLayer.graphics) if (Array.isArray(e)) for (var o = 0; o < e.length; o++) for (var a = 0; a < r.length; a++) r[a].attributes.id == e[o] && (r[a].attributes.newcontent = t[o]);
			else for (var a = 0; a < r.length; a++) r[a].attributes.id == e && (r[a].attributes.newcontent = t)
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
			e ? e.style.display = "block": (e = document.createElement("div"), e.setAttribute("id", "loadingStatus"), e.style.left = "50%", e.style.bottom = "50%", e.style.zIndex && (e.style.zIndex = "100"), e.style.position = "absolute", e.innerHTML = '<img src="' + url_image + 'loading-ring.gif">', document.getElementById(_gis.divID).appendChild(e))
		},
		this.showMapLoading = function(e) {
			var t = null,
			i = null;
			e && _utils.showLoadingUniversal(),
			t = dojo.connect(_mapObject, "onUpdateStart",
			function() {
				_utils.showLoadingUniversal()
			}),
			i = dojo.connect(_mapObject, "onUpdateEnd",
			function() {
				_utils.hideLoadingUniversal("mapLoadingStatus"),
				dojo.disconnect(t),
				dojo.disconnect(i),
				t = null,
				i = null
			})
		},
		this.showSearchAddress = function(e) {
			for (var t, i = e.results,
			r = new Array,
			o = 0; o < i.length; o++) t = new Object,
			t.x = i[o].location.lng,
			t.y = i[o].location.lat,
			t.html = "<p>名称：" + i[o].name + "</p><p>详细地址：" + i[o].formatted_address + "</p>",
			t.canShowTip = !0,
			t.source = url_image + "fav_icon.png",
			r[o] = new Object,
			r[o] = t;
			var a = new Array;
			_utils.moveXY(a, r),
			_utils.moveXY(r, _utils.convertPoints(r, 17)),
			_utils.addPoints2Map(r),
			_utils.moveXY(r, a)
		},
		this.showSearchPointResult = function(e, t) {
			for (var i, r = e.rows.length,
			o = e.rows,
			a = 0; a < r; a++) {
				var i = _utils.convertPoint(o[a].MAXX, o[a].MINY, t);
				i.id = "poi_" + o[a].ID,
				i.source = url_image + "fav_icon.png",
				i.html = '<div><p><font color="#ff0000">' + o[a].LABEL + "</font></p></div>",
				i.canShowTip = !0,
				_utils.addPoints2Map([i], null, null)
			}
			_gis.getMapLevel() < 12 && _gis.setMapLevel(12),
			dojo.query(".result-body")[0].click()
		},
		this.switchBaseMap = function(e, t) {
			return e != this.thCurrentType && (e == _gis.SATELLITE ? (_gis_BDVector.setVisibility(!1), _gis_BDVector_t.setVisibility(!1), _gis_BDImage.setVisibility(!0), _gis_BDPoi.setVisibility(!0)) : (e == _gis.NORMAL ? (_gis_BDVector.setVisibility(!0), _gis_BDVector_t.setVisibility(!1)) : (_gis_BDVector_t.setThematicType(e), _gis_BDVector.setVisibility(!1), _gis_BDVector_t.setVisibility(!0), t || _gis_BDVector_t.refresh()), _gis_BDImage.setVisibility(!1), _gis_BDPoi.setVisibility(!1)), void(this.thCurrentType = e))
		},
		!0
	}
	function SearchToolForGis(e) {
		"use strict";
		var t, r = this,
		o = 1,
		a = [],
		n = dojo.byId("_gis_searchBar_result_pageBar"),
		s = 10,
		l = 0,
		c = {},
		d = dojo.byId("_gis_searchBar_result_bodyPannel"),
		u = dojo.byId("_gis_searchBar_result_container"),
		p = null,
		y = '<div class="_gis-search-loading"></div>',
		m = '<div class="_gis-search-notFound">未查询到相关信息</div>',
		g = 0,
		h = url_prefix + "gisManager/pub/search/queryNetSearch.do";
		this.getIdArray = function() {
			return a
		},
		this.getCurrentPage = function() {
			return o
		},
		this.getPagetotal = function() {
			return l
		},
		this.getTotalRows = function() {
			return g
		},
		this.getSearchCity = function() {
			return p
		},
		this.getPageSize = function() {
			return s
		},
		this.setCurrentPage = function(e) {
			o = e
		},
		this.setPagetotal = function(e) {
			l = e
		},
		this.setTotalRows = function(e) {
			g = e
		},
		this.setSearchCity = function(e) {
			p = e
		},
		this.setPageSize = function(e) {
			s = e
		},
		this.clearAll = function() {
			dojo.attr(d, {
				innerHTML: ""
			}),
			dojo.attr(n, {
				innerHTML: ""
			}),
			esri.hide(n),
			e.removePointMarkersById(a),
			_utils.hideInfoWindow(),
			this.clearArray(a),
			this.clearHTML(c)
		},
		this.clearArray = function(e) {
			if (Array.isArray(e)) for (var t = 0; t < e.length; t++) e.shift(t)
		},
		this.clearHTML = function(e) {
			for (var t in e) delete e[t]
		},
		this.createSearchBarContainer = function(t) {
			var i, a, n = e.districtName;
			require(["dojo/on", "dojo/mouse", "dojo/touch", "dojo/dom-construct", "dojo/query", "dojo/dom-class", "dojo/domReady!"],
			function(s, l, c, d, u, p) {
				function y(t, i) {
					var r = dojo.byId(e.divID + "_root"),
					o = t.result,
					n = dojo.create("div");
					p.add(n, "_gis-search-suggest"),
					dojo.place(n, r, "last");
					var c = dojo.create("div");
					dojo.place(c, n);
					for (var y = function(e) {
						var t = dojo.create("div");
						dojo.style(t, {
							padding: "5px"
						});
						var r = dojo.create("a");
						dojo.style(r, {});
						var o = dojo.create("span", {
							innerHTML: e.name.replace(i.trim(), "<b>" + i.trim() + "</b>")
						}),
						l = dojo.create("i", {
							innerHTML: "&nbsp;" + e.city + e.district
						}),
						p = dojo.create("input", {
							type: "hidden",
							name: "searchKey",
							value: e.name
						}),
						y = dojo.create("input", {
							type: "hidden",
							name: "city",
							value: e.city
						});
						dojo.place(t, c, "last"),
						dojo.place(r, t),
						dojo.place(o, r),
						dojo.place(l, r),
						dojo.place(p, r),
						dojo.place(y, r),
						s(r, "click",
						function(e) {
							var t = u('input[name="searchKey"]', this)[0];
							h.value = dojo.attr(t, "value"),
							t = u('input[name="city"]', this)[0],
							a = dojo.attr(t, "value"),
							_.click(),
							d.destroy(n)
						})
					},
					m = function() {
						var e = dojo.create("div");
						p.add(e, "_gis-search-suggest-close");
						var t = dojo.create("a", {
							innerHTML: "关闭"
						});
						dojo.place(t, e),
						dojo.place(e, n, "last"),
						s(t, "click",
						function(e) {
							d.destroy(n)
						})
					},
					g = 0; g < o.length; g++) y(o[g]);
					return s(c, l.enter,
					function(e) {
						C = !0
					}),
					s(c, l.leave,
					function(e) {
						C = !1
					}),
					m(),
					n
				}
				var m = dojo.create("div", {
					id: t + "_main_container"
				}),
				h = dojo.create("input", {
					id: t + "_search_input",
					type: "text",
					placeholder: "请输入搜索内容"
				}),
				_ = dojo.create("button", {
					id: t + "_search_button",
					innerHTML: "搜索"
				}),
				b = dojo.create("div", {
					id: t + "_result_container"
				}),
				v = dojo.create("div", {
					id: t + "_result_pannel"
				}),
				f = dojo.create("div");
				p.add(f, "_gis-searchBar-btn_Box");
				var S = dojo.create("div", {
					innerHTML: "清除标记"
				});
				p.add(S, "_gis-search-trash_btn");
				var L = dojo.create("i", {
					title: "清除标记"
				}),
				w = dojo.create("div", {
					title: "关闭搜索结果"
				});
				p.add(w, "_gis-search-close_btn");
				var x = dojo.create("div", {
					id: t + "_result_bodyPannel",
					clickindex: "-1"
				}),
				j = dojo.create("div", {
					id: t + "_result_bottomPannel"
				}),
				O = dojo.create("div", {
					id: t + "_result_pageBar"
				});
				dojo.place(b, m, "last"),
				dojo.place(h, m, "first"),
				dojo.place(_, h, "after"),
				dojo.place(m, dojo.byId(_gis_WidgetsContainer), "last"),
				dojo.place(v, b),
				dojo.place(f, v),
				dojo.place(S, f),
				dojo.place(L, S, "first"),
				dojo.place(w, f, "last"),
				dojo.place(x, v, "last"),
				dojo.place(j, v, "last"),
				dojo.place(O, j);
				var M, C = !1;
				s(h, "input",
				function(t) {
					esri.hide(b);
					var i = h.value;
					if (null == i || "" == i) return void d.destroy(M);
					var r = new Object({
						searchText: i
					});
					e.searchAddress_Suggestion(r,
					function(e) {
						d.destroy(M),
						0 != e.result.length && (M = y(e, i))
					})
				}),
				s(h, "keypress",
				function(e) {
					e.keyCode == dojo.keys.ENTER && (d.destroy(M), _.click())
				}),
				s(h, "keydown",
				function(e) {
					e.keyCode == dojo.keys.BACKSPACE && d.destroy(M)
				}),
				s(h, "blur",
				function(e) {
					C || d.destroy(M)
				}),
				s(w, "click",
				function(e) {
					esri.hide(b)
				}),
				s(S, "click",
				function(t) {
					e.clearPointMarkers(),
					_utils.hideInfoWindow()
				}),
				s(_, "click",
				function(t) {
					function s(t) {
						if (!t || 0 != t.status || 0 == t.total) return void r.search({
							key: l,
							page: 1,
							rows: 10
						});
						g = t.total,
						1 == e.modouleConfig.searchResultShow && r.showResultPoints(t.rows, !0),
						r.createResultItem(t.rows, !0),
						r.itemClickListener(_utils.bdPoiClickEvent);
						var i = {
							page: t.page,
							pagetotal: t.pagetotal
						};
						r.createResultPage(i);
						var a = function(t) {
							t && 0 != t && o != t && (u.page_num = t, e.searchAddress_BD(u, s, !0), r.showLoading())
						};
						r.pageButtonClickistener(a)
					}
					i = o,
					d.destroy(M),
					r.showLoading();
					var l = h.value;
					if (null == l || "" == l) return d.destroy(M),
					void esri.hide(b);
					var c = a ? a: dojo.attr(dojo.byId("_gisCurrentCityBtn"), "innerHTML"),
					c = c ? c: n;
					a = null;
					var u = new Object({
						searchText: l,
						cityText: c,
						page_num: i
					});
					e.searchAddress_BD(u, s, !0),
					r.showLoading()
				}),
				r.initContainer()
			})
		},
		this.createResultItem = function(e, t) {
			var i, r, o, a, n, s, l, c = url_image + (t ? "dupoi.png": "chinaM.png");
			for (dojo.attr(d, {
				innerHTML: ""
			}), a = 0; a < e.length; a++) o = e[a],
			i = o.city || o.county || o.town ? o.city + o.county + o.town: o.fullname,
			i = i ? i + "&nbsp;": "",
			s = o.type ? o.type + "&nbsp;": "",
			l = o.datatype ? o.datatype: "",
			r = o.detail ? ' detail="' + o.detail + '"': "",
			n = '<div class="_gis-search-item" poiid="' + o.id + '" x="' + o.x + '" y="' + o.y + '"' + r + ">",
			n += '<div class="_gis-search-item-pin _gis-pin' + parseInt(a + 1) + '"></div>',
			n += '<div class="_gis-search-item-coord">',
			n += '<div class="_gis-search-item-name" title="' + o.name + '">' + o.name + "</div>",
			n += '<div class="_gis-search-item-address"  title="' + i + '">' + i + '<span class="_gis-search-item-tag">' + s + '<i class="_gis-search-item-usource">' + l + "</i></span></div>",
			n += "</div>",
			n += '<img class="_gis-search-item-photo" src="' + c + '"/><div style="clear:both;"></div>',
			n += "</div>",
			dojo.place(n, d, "last");
			esri.show(u)
		},
		this.createResultPage = function(e, t) {
			var i, o, a, s, l, c = e.page ? Number(e.page) : 1,
			d = 56,
			u = e.pagetotal ? Number(e.pagetotal) : 1;
			esri.show(n),
			c = c < 1 ? 1 : c,
			c = c > u ? u: c,
			dojo.attr(n, {
				innerHTML: ""
			}),
			r.setCurrentPage(c),
			r.setPagetotal(u),
			a = 1 == c,
			s = a ? "": ' value="1"',
			l = a ? " disable": "";
			var p = '<div class="_gis-page" id="_gis_page_first"><a class="_gis-page-btn"';
			for (p += s, p += '><i class="_gis-page-btn-first', p += l, p += '"/></a></div>', dojo.place(p, n), s = a ? "": ' value="' + parseInt(c - 1) + '"', p = '<div class="_gis-page" id="_gis_page_previous"><a class="_gis-page-btn"', p += s, p += '><i class="_gis-page-btn-previous', p += l, p += '"/></a></div>', dojo.place(p, n, "last"), u <= 5 ? (i = 1, o = u) : c > 0 && c < 4 ? (i = 1, o = 5) : u - c < 2 ? (i = u - 4, o = u) : (i = c - 2, o = i + 4); ! (i > u || i > o); i++) p = '<div class="_gis-page _gis-page-number',
			p += i == c ? " _gis-page-btn-current": "",
			p += '"><a class="_gis-page-btn" value="',
			p += i,
			p += '">',
			p += i,
			p += "</a></div>",
			dojo.place(p, n, "last"),
			d += 30;
			if (1 != u) {
				p = '<div class="_gis-page" id="_gis_page_jump"><input type="text" class="_gis-page-jump" id="_gis_page_jump_value"/><div class="_gis-page-jump _gis-page-jump-showTatol">/<span style="color:darkgray">' + u + '</span>&nbsp;<a class="_gis-page-btn" id="_gis_page_jump_btn">跳转</a></div></div>',
				dojo.place(p, n, "last");
				var y = dojo.style(dojo.byId("_gis_page_jump"), "width");
				d += y + 6
			}
			a = c == u,
			s = a ? "": ' value="' + parseInt(c + 1) + '"',
			l = a ? " disable": "",
			p = '<div class="_gis-page" id="_gis_page_next"><a class="_gis-page-btn"',
			p += s,
			p += '><i class="_gis-page-btn-next' + l + '"/></a></div>',
			dojo.place(p, n, "last"),
			s = a ? "": ' value="' + u + '"',
			p = '<div class="_gis-page"  id="_gis_page_last"><a class="_gis-page-btn"',
			p += s,
			p += '><i class="_gis-page-btn-last' + l + '"/></a></div>',
			dojo.place(p, n, "last"),
			d += 10,
			dojo.style(n, {
				width: d + "px"
			}),
			_utils.callbackFuncRun(t)
		},
		this.itemClickListener = function(t) {
			var i = dojo.query("._gis-search-item", d),
			r = !!e.modouleConfig.searchResultShow,
			t = isFunction(t) ? t: function(t, i, o, n) {
				var s = "poi_" + dojo.attr(this, "poiid"),
				l = dojo.attr(this, "x"),
				d = dojo.attr(this, "y"),
				u = dojo.attr(dojo.query("._gis-search-item-name", this)[0], "innerHTML");
				if (r && !_utils.hasPoint(s)) {
					var p = new Object({
						x: l,
						y: d,
						id: s,
						source: url_image + "mappins/pin" + this.countNo + ".png",
						canShowTip: !0
					});
					p.html = c[s] ? c[s] : u,
					e.addPointMarkers([p], {},
					{},
					14),
					a.push(s)
				}
				e.showTipOfPointMarker(s),
				e.setMapCenter({
					x: l,
					y: d
				})
			};
			require(["dojo/on", "dojo/mouse", "dojo/dom-class"],
			function(e, r, o) {
				i.forEach(function(i, a) {
					var n = dojo.query("._gis-search-item-pin", i)[0],
					s = parseInt(a + 1);
					e(i, r.enter,
					function() {
						o.add(n, "_gis-pin" + s + "-hover")
					}),
					e(i, r.leave,
					function() {
						o.remove(n, "_gis-pin" + s + "-hover")
					}),
					i.countNo = s,
					i.onclick = t
				})
			})
		},
		this.initContainer = function() {
			n = dojo.byId("_gis_searchBar_result_pageBar"),
			d = dojo.byId("_gis_searchBar_result_bodyPannel"),
			u = dojo.byId("_gis_searchBar_result_container")
		},
		this.pageButtonClickistener = function(e) {
			var i = (dojo.query("._gis-page-number ._gis-page-btn", n),
			function(i) {
				if (isFunction(e)) return void e(Number(i));
				var a = {},
				i = Number(i);
				i && 0 != i && o != i && (r.searchCity && (a.city = p), a.page = i, a.key = t, r.search(a))
			});
			require(["dojo/on", "dojo/mouse", "dojo/dom-class"],
			function(e, t, r) {
				dojo.forEach(dojo.query("._gis-page-number ._gis-page-btn", n),
				function(t, r) {
					e(t, "click",
					function(e) {
						var t = dojo.attr(this, "value");
						i(t)
					})
				}),
				1 != o && (e(dojo.query("#_gis_page_first a")[0], "click",
				function(e) {
					var t = dojo.attr(this, "value");
					i(t)
				}), e(dojo.query("#_gis_page_previous a")[0], "click",
				function(e) {
					var t = dojo.attr(this, "value");
					i(t)
				})),
				l != o && (e(dojo.query("#_gis_page_next a")[0], "click",
				function(e) {
					var t = dojo.attr(this, "value");
					i(t)
				}), e(dojo.query("#_gis_page_last a")[0], "click",
				function(e) {
					var t = dojo.attr(this, "value");
					i(t)
				}));
				var a = dojo.byId("_gis_page_jump_btn");
				a && e(dojo.byId("_gis_page_jump_btn"), "click",
				function(e) {
					var t = dojo.attr(dojo.byId("_gis_page_jump_value"), "value");
					i(t)
				})
			})
		},
		this.processingResult = function(e) {
			if (e = e[0], !e || 0 != e.status || 0 == e.total) return dojo.attr(d, {
				innerHTML: m
			}),
			void esri.hide(n);
			g = e.total,
			r.showResultPoints(e.rows),
			r.createResultItem(e.rows, !1),
			r.itemClickListener();
			var t = {
				page: e.page,
				pagetotal: e.pagetotal
			};
			r.createResultPage(t),
			r.pageButtonClickistener()
		},
		this.search = function(e, i) {
			if (e && e.key) {
				var r = encodeURIComponent(e.key),
				a = {
					searchKey: r,
					rows: e.rows ? e.rows: s,
					page: e.page ? e.page: o
				};
				e.city ? (p = e.city, a.city = encodeURIComponent(e.city)) : p && (a.city = encodeURIComponent(p));
				var i = isFunction(i) ? i: this.processingResult;
				dojo.io.script.get({
					url: h,
					callbackParamName: "callback",
					content: a,
					load: i,
					error: function(e) {
						console.debug("Add Search Result List Item Error!"),
						console.debug(e)
					}
				}),
				t = e.key,
				this.showLoading()
			}
		},
		this.showResultPoints = function(t, r) {
			if (t && 0 != t.length) {
				var o, n, s, l = [],
				c = !!e.modouleConfig.searchResultShow,
				d = this.pointHTML,
				u = r ? 14 : null;
				for (this.clearArray(a), i = 0; i < t.length; i++) {
					var p = t[i];
					n = "poi_" + p.id,
					o = new Object({
						x: p.x,
						y: p.y,
						id: n,
						source: url_image + "mappins/pin" + parseInt(i + 1) + ".png",
						canShowTip: !0
					}),
					s = "<div><p>地址名称：" + p.name,
					s += "</p><p>详细地址：" + p.fullname,
					s += "</p><p>地址分类：" + p.type,
					s += "</p><p>数据来源：" + p.datatype + "</p></div>",
					o.html = s,
					c ? (a.push(n), l.push(o)) : d[n] = s
				}
				c && e.addPointMarkers(l, {},
				{},
				u)
			}
		},
		this.showLoading = function(e) {
			r.clearAll(),
			dojo.attr(d, {
				innerHTML: y
			}),
			esri.show(u)
		}
	}
	function addMeasureServer() {
		require(["esri/toolbars/draw"],
		function(e) {
			geometryService = new esri.tasks.GeometryService(url_mapSvrPre + "arcgis/rest/services/Utilities/Geometry/GeometryServer"),
			tb = new e(_mapObject),
			tb.on("draw-end",
			function(e) {
				tb.deactivate();
				var t, i = e.geometry;
				switch (i.type) {
				case "point":
					t = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, 10, new esri.symbol.SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 1), new dojo.Color([0, 255, 0, .25]));
					break;
				case "polyline":
					t = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASH, new dojo.Color([255, 0, 0]), 1);
					break;
				case "polygon":
					t = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NONE, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, .25]))
				}
				var r = new esri.Graphic(i, t);
				mapSpatialLayer.add(r),
				MeasureGeometry(i),
				Gis.spatialGeometry = spatialGeometry = i
			})
		})
	}
	function MeasureGeometry(e) {
		require(["esri/tasks/LengthsParameters", "esri/tasks/AreasAndLengthsParameters"],
		function(t, i) {
			if ("polyline" == e.type) {
				var r = new t;
				r.polylines = [e],
				r.lengthUnit = esri.tasks.GeometryService.UNIT_METER,
				r.geodesic = !0,
				r.polylines[0].spatialReference = new esri.SpatialReference(_mapObject.spatialReference),
				geometryService.lengths(r)
			} else if ("polygon" == e.type) {
				var o = new i;
				o.lengthUnit = esri.tasks.GeometryService.UNIT_METER,
				o.areaUnit = esri.tasks.GeometryService.UNIT_SQUARE_METERS,
				this.outSR = new esri.SpatialReference(_mapObject.spatialReference),
				geometryService.project([e], this.outSR,
				function(e) {
					geometryService.simplify(e,
					function(e) {
						o.polygons = e,
						o.polygons[0].spatialReference = new esri.SpatialReference(_mapObject.spatialReference),
						geometryService.areasAndLengths(o)
					})
				})
			}
		})
	}
	function outputAreaAndLength(e) {
		var t = new esri.geometry.Point(spatialGeometry.rings[0][0], _mapObject.spatialReference),
		i = e.areas[0] / 1.4256,
		r = parseInt(String(e.lengths[0])) / 1.19432856685505,
		o = "面积： ";
		o = i > 1e6 ? o + (i / 1e6).toFixed(3) + "平方公里； 周长：   ": o + i.toFixed(1) + "平方米；周长：  ",
		o = r > 9999 ? o + (r / 1e3).toFixed(3) + " 千米；": o + r.toFixed(1) + "米；",
		addLabel2Point(t, o)
	}
	function addLabel2Point(e, t) {
		var i = new esri.Graphic;
		i.setGeometry(e);
		var r = new esri.symbol.Font;
		r.setSize(10);
		var o = new esri.symbol.TextSymbol(t).setColor(new esri.Color([0, 0, 255, 1])).setFont(r);
		o.setOffset(0, -12),
		i.setSymbol(o),
		mapSpatialLayer.add(i)
	}
	function doBuffer(e) {
		require(["dojo/_base/array", "esri/config", "esri/tasks/BufferParameters", "esri/tasks/GeometryService", "esri/geometry/normalizeUtils"],
		function(e, t, i, r, o) {
			t.defaults.geometryService = new r(url_mapSvrPre + "arcgis/rest/services/Utilities/Geometry/GeometryServer");
			var a = new i;
			a.distances = [1],
			a.outSpatialReference = _mapObject.spatialReference,
			a.unit = r.UNIT_KILOMETER,
			o.normalizeCentralMeridian([spatialGeometry]).then(function(i) {
				function r(t) {
					var i = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255, 0, 0, .65]), 2), new dojo.Color([255, 255, 0, .35]));
					e.forEach(t,
					function(e) {
						var t = new esri.Graphic(e, i);
						mapSpatialLayer.add(t)
					})
				}
				var o = i[0];
				"polygon" === o.type ? t.defaults.geometryService.simplify([o],
				function(e) {
					a.geometries = e,
					t.defaults.geometryService.buffer(a, r)
				}) : (a.geometries = [o], t.defaults.geometryService.buffer(a, r))
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
		i = 0; i < e.length; i++) t = linejson + "[" + e[i].x + "," + e[i].y + "],";
		return t = t.Substring(0, t.Length - 1)
	}
	function segmentsIntr(e, t, i, r) {
		var o = (e.x - i.x) * (t.y - i.y) - (e.y - i.y) * (t.x - i.x),
		a = (e.x - r.x) * (t.y - r.y) - (e.y - r.y) * (t.x - r.x);
		if (o * a >= 0) return ! 1;
		var n = (i.x - e.x) * (r.y - e.y) - (i.y - e.y) * (r.x - e.x),
		s = n + o - a;
		if (n * s >= 0) return ! 1;
		var l = n / (a - o),
		c = l * (t.x - e.x),
		d = l * (t.y - e.y);
		return {
			x: e.x + c,
			y: e.y + d
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
	function coordPointwgs2bdmc(e) {
		var t = [];
		try {
			var i = e.split(",");
			if (i.length > 1) {
				var r = _utils.convertPoint(Number(i[0]), Number(i[1]));
				t = [Number(r.x), Number(r.y)]
			}
		} catch(o) {}
		return t
	}
	function coordPointswgs2bdmc(e) {
		for (var t = [], i = e.split(";"), r = 0; r < i.length; r++) {
			var o = coordPointwgs2bdmc(i[r]);
			t.push(o)
		}
		return t
	}
	function doclick(e) {
		function t(e, t, r, o) {
			var a = "http://api.map.baidu.com/panorama/v2?ak=nv89hhhaRpvdtk4HojFMM8NLUAhCMMVm&width=350&height=250&fov=180&location=";
			a += e + "," + t;
			var n = new Image;
			n.src = a,
			n.CurPos = r,
			n.clickPoint = o,
			n.title = "全景图片",
			n.complete ? i(this.CurPos, 370, 270, this, this.title, this.clickPoint) : (n.onload = function() {
				i(this.CurPos, 370, 270, this, this.title, this.clickPoint)
			},
			n.onerror = function() {
				var e = '<h5 style="color:red">未找到全景图</h5>';
				i(this.CurPos, 200, 100, e, this.title, this.clickPoint)
			})
		}
		function i(e, t, i, r, o, a) {
			mapSpatialLayer.clear(),
			mapSpatialLayer.add(a);
			var n = new Object({
				width: t,
				height: i,
				title: o,
				content: r,
				graphic: a
			});
			_utils.infoWindowOpen(n),
			_utils.hideLoadingUniversal("mapLoadingStatus")
		}
		_utils.showLoadingUniversal();
		var r = e.mapPoint.x / 1.19432856685505,
		o = e.mapPoint.y / 1.19432856685505,
		a = "http://api.map.baidu.com/geoconv/v1/?ak=nv89hhhaRpvdtk4HojFMM8NLUAhCMMVm&from=6&to=5&coords=" + r + "," + o,
		n = {
			url: a,
			callbackParamName: "callback",
			load: function(i) {
				if (0 == i.status) {
					var r = parseFloat(i.result[0].x.toFixed(6)),
					o = parseFloat(i.result[0].y.toFixed(6)),
					a = new esri.geometry.Point(e.mapPoint.x, e.mapPoint.y, _mapObject.spatialReference),
					n = new esri.symbol.PictureMarkerSymbol(url_image + "fav_icon.png", 16, 24),
					s = new esri.Graphic(a, n);
					t(r, o, s.geometry, s)
				}
			},
			error: function(e) {
				console.log("An unexpected error occurred: " + e)
			}
		};
		dojo.io.script.get(n)
	}
	function addMsPointsServer(e) {
		require(["esri/toolbars/draw"],
		function(t) {
			geometryService = new esri.tasks.GeometryService(url_mapSvrPre + "arcgis/rest/services/Utilities/Geometry/GeometryServer"),
			tb = new t(_mapObject),
			tb.activate(esri.toolbars.Draw.POLYGON),
			tb.on("draw-end",
			function(t) {
				tb.deactivate();
				var i = t.geometry,
				r = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NONE, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, .25])),
				o = new esri.Graphic(i, r);
				mapSpatialLayer.add(o),
				doReturnGeometry(i, e)
			})
		})
	}
	function doReturnGeometry(e, t) {
		for (var i = 1.19432856685505,
		r = e.rings[0].toString(), o = r.split(","), a = "", n = 0; n < o.length; n++) a = a + Number(o[n]) / i + "," + Number(o[n + 1]) / i + ";",
		n++;
		a = a.substring(0, a.length - 1);
		var s = "http://api.map.baidu.com/geoconv/v1/?ak=nv89hhhaRpvdtk4HojFMM8NLUAhCMMVm",
		l = {
			url: s,
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
		dojo.io.script.get(l)
	}
	function addMsAreaServer() {
		require(["esri/toolbars/draw"],
		function(e) {
			geometryService = new esri.tasks.GeometryService(url_mapSvrPre + "arcgis/rest/services/Utilities/Geometry/GeometryServer"),
			tb = new e(_mapObject),
			tb.activate(esri.toolbars.Draw.POLYGON),
			tb.on("draw-end",
			function(e) {
				tb.deactivate();
				var t = e.geometry,
				i = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NONE, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, .25])),
				r = new esri.Graphic(t, i);
				mapSpatialLayer.add(r),
				MeasureGeometry(t),
				Gis.spatialGeometry = spatialGeometry = t
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
		require(["esri/toolbars/draw"],
		function(t) {
			geometryService = new esri.tasks.GeometryService(url_mapSvrPre + "arcgis/rest/services/Utilities/Geometry/GeometryServer"),
			tb = new t(_mapObject),
			tb.activate(esri.toolbars.Draw.POLYGON),
			tb.on("draw-end",
			function(t) {
				tb.deactivate();
				var i = t.geometry,
				r = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NONE, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, .25])),
				o = new esri.Graphic(i, r);
				mapSpatialLayer.add(o),
				doBufferGeometry(i, e)
			})
		})
	}
	function doBufferGeometry(e, t) {
		require(["dojo/_base/array", "esri/config", "esri/tasks/BufferParameters", "esri/tasks/GeometryService", "esri/geometry/normalizeUtils"],
		function(i, r, o, a, n) {
			r.defaults.geometryService = new a(url_mapSvrPre + "arcgis/rest/services/Utilities/Geometry/GeometryServer");
			var s = new o;
			s.distances = [t],
			s.outSpatialReference = _mapObject.spatialReference,
			s.unit = a.UNIT_KILOMETER,
			n.normalizeCentralMeridian([e]).then(function(e) {
				function t(e) {
					var t = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255, 0, 0, .65]), 2), new dojo.Color([255, 255, 0, .35]));
					i.forEach(e,
					function(e) {
						var i = new esri.Graphic(e, t);
						mapSpatialLayer.add(i)
					})
				}
				var o = e[0];
				"polygon" === o.type ? r.defaults.geometryService.simplify([o],
				function(e) {
					s.geometries = e,
					r.defaults.geometryService.buffer(s, t)
				}) : (s.geometries = [o], r.defaults.geometryService.buffer(s, t))
			})
		})
	}
	function AddMsCircleServer(e, t, i) {
		var r = _utils.convertPoint(e.x, e.y);
		require(["esri/units", "esri/geometry/Circle", "dojo/dom"],
		function(e, o, a) {
			function n(e) {
				function t(e) {
					for (var t, i = e.features,
					o = [], a = 0; a < i.length; a++) t = i[a],
					u.contains(t.geometry) && o.push(t.attributes.UUID);
					var n = new esri.tasks.Query;
					n.geometry = u,
					r.selectFeatures(n, esri.layers.FeatureLayer.SELECTION_NEW,
					function(e) {
						for (var t = e.length,
						i = 0; i < t; i++) {
							var r = new esri.InfoTemplate;
							r.setContent("OBJECTID:" + e[i].attributes.OBJECTID),
							e[i].setInfoTemplate(r)
						}
					})
				}
				var r = new esri.layers.FeatureLayer(i + "/0", {
					id: "demodata"
				}),
				o = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 12, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_NULL, new dojo.Color([247, 34, 101, .9]), 1), new dojo.Color([207, 34, 171, .5]));
				r.setSelectionSymbol(o);
				var a = (new esri.symbol.SimpleMarkerSymbol).setSize(0);
				r.setRenderer(new esri.renderer.SimpleRenderer(a)),
				_mapObject.addLayer(r);
				var n = new esri.tasks.Query;
				n.geometry = u.getExtent(),
				r.queryFeatures(n, t)
			}
			var s = new esri.geometry.Point(r.x, r.y, _mapObject.spatialReference),
			l = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 5, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 255, 255]), 4), new dojo.Color([250, 139, 46])),
			c = new esri.Graphic;
			c.setGeometry(s),
			c.setSymbol(l),
			mapSpatialLayer.add(c);
			var d = new esri.geometry.Point(r.x, r.y, _mapObject.spatialReference),
			u = new o({
				center: d,
				geodesic: !0,
				radius: t,
				radiusUnit: e.KILOMETERS
			}),
			p = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, .25])),
			y = new esri.Graphic;
			y.setGeometry(u),
			y.setSymbol(p),
			mapSpatialLayer.add(y),
			n(u)
		})
	}
	function doPolymerization(e) {
		require(["dojo/parser", "dojo/ready", "dojo/_base/array", "esri/Color", "dojo/dom-style", "dojo/query", "esri/map", "esri/request", "esri/graphic", "esri/geometry/Extent", "esri/tasks/query", "esri/tasks/QueryTask", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleFillSymbol", "esri/symbols/PictureMarkerSymbol", "esri/renderers/ClassBreaksRenderer", "esri/layers/GraphicsLayer", "esri/dijit/PopupTemplate", "esri/geometry/Point", "esri/config", "extras/ClusterLayer", "esri/symbols/SimpleMarkerSymbol", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dojo/domReady!"],
		function(t, i, r, o, a, n, s, l, c, d, u, p, y, m, g, h, _, b, v, f, S, y) {
			function L(e) {
				var t = {};
				t.data = r.map(e,
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
				clusterLayer = new S({
					data: t.data,
					distance: 100,
					id: "clusters",
					labelColor: "#fff",
					labelOffset: -5,
					resolution: _mapObject.extent.getWidth() / _mapObject.width,
					singleColor: "#888"
				});
				var i = (new y).setSize(8),
				o = new h(i, "clusterCount");
				o.addBreak(0, 9, new y(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 30, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 255, 255]), 2), new dojo.Color([250, 139, 46]))),
				o.addBreak(10, 99, new y(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 50, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 255, 255]), 4), new dojo.Color([250, 139, 46]))),
				o.addBreak(100, 999, new y(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 80, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 255, 255]), 6), new dojo.Color([250, 139, 46]))),
				o.addBreak(1e3, 9999, new y(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 100, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 255, 255]), 10), new dojo.Color([250, 139, 46]))),
				o.addBreak(1e4, 99999, new y(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 120, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 255, 255]), 10), new dojo.Color([250, 139, 46]))),
				o.addBreak(1e5, 999999, new y(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 140, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 255, 255]), 14), new dojo.Color([250, 139, 46]))),
				o.addBreak(1e6, 99999999, new y(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 170, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 255, 255]), 16), new dojo.Color([250, 139, 46]))),
				clusterLayer.setRenderer(o),
				clusterLayer.setVisibility(!0),
				_mapObject.addLayer(clusterLayer)
			}
			function w(e) {
				console.log("something failed: ", e)
			}
			var x = l({
				url: e,
				handleAs: "json"
			});
			x.then(L, w)
		})
	}
	var _mapObject, url_prefix = "http://10.70.194.131/",
	url_jsapi = url_prefix,
	resource_pro = url_prefix + "gis/",
	url_gis_mng = url_prefix + "gisManager/",
	url_image = resource_pro + "image/",
	url_mapSvrPre = url_prefix,
	url_mapSvr_zj = url_mapSvrPre + "arcgis/rest/services/ZJ/",
	url_bd_prefix = url_prefix,
	bd_api2 = url_prefix,
	bd_online1 = url_prefix,
	bd_shangetu2 = url_prefix,
	bd_api_place = url_bd_prefix + "place/v2/",
	bd_api_geocoder = url_bd_prefix + "geocoder/v2/",
	bd_api_direction = url_bd_prefix + "direction/v2/",
	bizLayer = {},
	coverareadistUrl = url_mapSvr_zj + "COVER_AREA_DIST/MapServer",
	_testDemo = url_mapSvr_zj + "YGDATA/MapServer",
	_gis_BDVector = null,
	_gis_BDVector_t = null,
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
	BDLTool = {},
	_gis_mapWaitFlag = !1,
	_gis_funcWaitFlag1 = !1,
	_gis_funcWaitFlag2 = !1,
	businessLayerManager = 0;
	geometryService = null,
	isIE = !!window.ActiveXObject,
	ieOptionWarringMessage = '无法执行跨域资源加载，并且ActiveX代码被禁止，程序无法继续执行！\n\n请手动设置您的IE:\n      1、将 "Internet 选项" → "安全"选项卡 → "本地 Internet" → "自定义级别" → "通过域访问数据源" 设置为允许\n      2、重启浏览器',
	window.djConfig = {
		parseOnLoad: !0
	},
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
			var i, r, o, a, n, s = gap,
			l = t[e];
			switch (l && "object" == typeof l && "function" == typeof l.toJSON && (l = l.toJSON(e)), "function" == typeof rep && (l = rep.call(t, e, l)), typeof l) {
			case "string":
				return quote(l);
			case "number":
				return isFinite(l) ? String(l) : "null";
			case "boolean":
			case "null":
				return String(l);
			case "object":
				if (!l) return "null";
				if (gap += indent, n = [], "[object Array]" === Object.prototype.toString.apply(l)) {
					for (a = l.length, i = 0; i < a; i += 1) n[i] = str(i, l) || "null";
					return o = 0 === n.length ? "[]": gap ? "[\n" + gap + n.join(",\n" + gap) + "\n" + s + "]": "[" + n.join(",") + "]",
					gap = s,
					o
				}
				if (rep && "object" == typeof rep) for (a = rep.length, i = 0; i < a; i += 1)"string" == typeof rep[i] && (r = rep[i], o = str(r, l), o && n.push(quote(r) + (gap ? ": ": ":") + o));
				else for (r in l) Object.prototype.hasOwnProperty.call(l, r) && (o = str(r, l), o && n.push(quote(r) + (gap ? ": ": ":") + o));
				return o = 0 === n.length ? "{}": gap ? "{\n" + gap + n.join(",\n" + gap) + "\n" + s + "}": "{" + n.join(",") + "}",
				gap = s,
				o
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
		JSON.stringify = function(e, t, i) {
			var r;
			if (gap = "", indent = "", "number" == typeof i) for (r = 0; r < i; r += 1) indent += " ";
			else "string" == typeof i && (indent = i);
			if (rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length)) throw new Error("JSON.stringify");
			return str("", {
				"": e
			})
		}),
		"function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
			function walk(e, t) {
				var i, r, o = e[t];
				if (o && "object" == typeof o) for (i in o) Object.prototype.hasOwnProperty.call(o, i) && (r = walk(o, i), void 0 !== r ? o[i] = r: delete o[i]);
				return reviver.call(e, t, o)
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
	Array.isArray || (Array.isArray = function(e) {
		return e && "[object Array]" === Object.prototype.toString.call(e)
	}),
	String.prototype.startsWith || (String.prototype.startsWith = function(e, t) {
		return t = t || 0,
		this.substr(t, e.length) === e
	}),
	String.prototype.endsWith || (String.prototype.endsWith = function(e, t) {
		var i = this.toString(); ("number" != typeof t || !isFinite(t) || Math.floor(t) !== t || t > i.length) && (t = i.length),
		t -= e.length;
		var r = i.lastIndexOf(e, t);
		return r !== -1 && r === t
	}),
	function(e) {
		"use strict";
		var t = e || {};
		return t.getExtent = function(e) {
			switch (e) {
			case 3:
				return {
					xmin:
					15784784.793464264,
					ymin: 4469893.414755747,
					xmax: 15803817.613507247,
					ymax: 4478607.235980244
				};
			case 4:
				return {
					xmin:
					15871193.460541463,
					ymin: 4493618.237337039,
					xmax: 15890226.280584445,
					ymax: 4502332.058561537
				};
			case 15:
				return {
					xmin:
					15985829.893725881,
					ymin: 4402753.719966907,
					xmax: 16004862.713768864,
					ymax: 4411467.541191405
				};
			case 21:
				return {
					xmin:
					16023475.130137935,
					ymin: 4355515.63648177,
					xmax: 16042507.950180918,
					ymax: 4364229.457706268
				};
			case 23:
				return {
					xmin:
					16034271.860382829,
					ymin: 4329679.920921321,
					xmax: 16053304.680425812,
					ymax: 4338393.742145819
				};
			case 26:
				return {
					xmin:
					16069337.347127698,
					ymin: 4458648.296900466,
					xmax: 16088370.167170681,
					ymax: 4467362.118124964
				};
			case 33:
				return {
					xmin:
					15867753.794267518,
					ymin: 4525511.587388661,
					xmax: 15886786.614310501,
					ymax: 4534225.408613159
				};
			case 39:
				return {
					xmin:
					15966854.401440231,
					ymin: 4680869.847378395,
					xmax: 15985887.221483214,
					ymax: 4689583.668602893
				};
			case 48:
				return {
					xmin:
					15547103.854011612,
					ymin: 4809426.694398348,
					xmax: 15623235.134183547,
					ymax: 4844281.979296343
				};
			case 60:
				return {
					xmin:
					15818662.112852175,
					ymin: 4714807.887936861,
					xmax: 15837694.932895157,
					ymax: 4723521.70916136
				};
			case 63:
				return {
					xmin:
					15842701.558247458,
					ymin: 4874274.638196488,
					xmax: 15861734.37829044,
					ymax: 4882988.459420987
				};
			case 69:
				return {
					xmin:
					15942318.115358124,
					ymin: 4434417.758929518,
					xmax: 15961350.935401106,
					ymax: 4443131.580154017
				};
			case 75:
				return {
					xmin:
					16096013.869981961,
					ymin: 4379707.95593438,
					xmax: 16115046.690024944,
					ymax: 4388421.777158879
				};
			case 74:
				return {
					xmin:
					16073312.07258092,
					ymin: 4358668.663898818,
					xmax: 16092344.892623903,
					ymax: 4367382.485123317
				};
			case 76:
				return {
					xmin:
					16055444.91721891,
					ymin: 4411505.75970078,
					xmax: 16074477.737261893,
					ymax: 4420219.580925278
				};
			case 77:
				return {
					xmin:
					16019882.58980891,
					ymin: 4443915.059693554,
					xmax: 16038915.409851892,
					ymax: 4452628.880918052
				};
			case 79:
				return {
					xmin:
					15935534.329098566,
					ymin: 4535238.199237728,
					xmax: 15954567.149141548,
					ymax: 4543952.020462226
				};
			case 84:
				return {
					xmin:
					15716504.02454806,
					ymin: 4773396.870117051,
					xmax: 15735536.844591042,
					ymax: 4782110.691341549
				};
			case "石家庄":
				return {
					xmin:
					15112278.789308868,
					ymin: 5392049.599613712,
					xmax: 15320187.506244626,
					ymax: 5491723.484497621
				};
			case "上海市":
				return {
					xmin:
					16014624.839629555,
					ymin: 4295377.794038926,
					xmax: 16222533.556565313,
					ymax: 4397344.78977139
				};
			case "杭州市":
				return {
					xmin:
					15871168.394057982,
					ymin: 4162856.865371678,
					xmax: 16068375.927033812,
					ymax: 4264823.861104141
				};
			case "武汉市":
				return {
					xmin:
					15075213.76200479,
					ymin: 4200522.34636784,
					xmax: 15283122.478940548,
					ymax: 4302489.342100304
				};
			case "广州市":
				return {
					xmin:
					14946215.54993771,
					ymin: 3086014.000061039,
					xmax: 15154124.266873468,
					ymax: 3187980.995793503
				};
			case "长沙市":
				return {
					xmin:
					14958687.9133117,
					ymin: 3864777.782476267,
					xmax: 15062642.271779398,
					ymax: 3915761.28034241
				};
			case "南京市":
				return {
					xmin:
					15687552.048134476,
					ymin: 4415596.458280391,
					xmax: 15895460.765070233,
					ymax: 4517563.454012855
				};
			case "拉萨市":
				return {
					xmin:
					12110720.186442584,
					ymin: 4103966.196249907,
					xmax: 12123102.985024765,
					ymax: 4110339.133483175
				};
			default:
				return {
					xmin:
					0,
					ymin: 0,
					xmax: 0,
					ymax: 0
				}
			}
		},
		t.getLods = function() {
			return [{
				level: 2,
				scale: 147914381.897889,
				resolution: 39135.7584820001
			},
			{
				level: 3,
				scale: 73957190.9489445,
				resolution: 19567.8792409999
			},
			{
				level: 4,
				scale: 36978595.4744723,
				resolution: 9783.93962049996
			},
			{
				level: 5,
				scale: 18489297.7372361,
				resolution: 4891.96981024998
			},
			{
				level: 6,
				scale: 9244648.86861806,
				resolution: 2445.98490512499
			},
			{
				level: 7,
				scale: 4622324.43430903,
				resolution: 1222.99245256249
			},
			{
				level: 8,
				scale: 2311162.21715452,
				resolution: 611.49622628138
			},
			{
				level: 9,
				scale: 1155581.10857726,
				resolution: 305.748113140558
			},
			{
				level: 10,
				scale: 577790.554288629,
				resolution: 152.874056570411
			},
			{
				level: 11,
				scale: 288895.277144314,
				resolution: 76.4370282850732
			},
			{
				level: 12,
				scale: 144447.638572157,
				resolution: 38.2185141425366
			},
			{
				level: 13,
				scale: 72223.8192860786,
				resolution: 19.1092570712683
			},
			{
				level: 14,
				scale: 36111.9096430393,
				resolution: 9.55462853563415
			},
			{
				level: 15,
				scale: 18055.9548215197,
				resolution: 4.77731426794937
			},
			{
				level: 16,
				scale: 9027.97741075983,
				resolution: 2.38865713397468
			},
			{
				level: 17,
				scale: 4513.98870537991,
				resolution: 1.19432856685505
			},
			{
				level: 18,
				scale: 2256.99435268996,
				resolution: .59716428342753
			}]
		},
		t.initb_rs = function(e) {
			_gis_funcWaitFlag1 = !1,
			require(["esri/layers/TiledMapServiceLayer", "esri/SpatialReference", "esri/geometry/Extent", "esri/layers/TileInfo", "dojo/domReady!"],
			function(i, r, o, a) {
				dojo.declare("BaiduLayer", esri.layers.TiledMapServiceLayer, {
					constructor: function(i) {
						this._mapStyle = i;
						var r = 20037508.3427892;
						this.spatialReference = new esri.SpatialReference({
							wkid: 102100
						}),
						this.fullExtent = new esri.geometry.Extent(( - r), ( - r), r, r, this.spatialReference);
						var o = t.getExtent(e);
						this.initialExtent = new esri.geometry.Extent(o.xmin, o.ymin, o.xmax, o.ymax, this.spatialReference),
						this.tileInfo = new esri.layers.TileInfo({
							rows: 256,
							cols: 256,
							compressionQuality: 0,
							origin: {
								x: -r,
								y: r
							},
							spatialReference: {
								wkid: 102100
							},
							lods: t.getLods()
						}),
						this.loaded = !0,
						this.onLoad(this)
					},
					getTileUrl: function(e, t, i) {
						var r, o = e + 1,
						a = Math.pow(2, e - 1),
						n = a - 1,
						s = i - a,
						l = -t + n;
						return "Vector" == this._mapStyle ? r = bd_online1 + "tile/?qt=tile&x=" + s + "&y=" + l + "&z=" + o + "&styles=pl&scaler=1": "Image" == this._mapStyle ? r = bd_shangetu2 + "it/u=x=" + s + ";y=" + l + ";z=" + o + ";v=009;type=sate&fm=46": "POI" == this._mapStyle && (r = bd_online1 + "tile/?qt=tile&x=" + s + "&y=" + l + "&z=" + o + "&styles=sl&v=041"),
						r
					}
				}),
				_gis_funcWaitFlag1 = !0
			})
		},
		t.initb_th = function(e) {
			_gis_funcWaitFlag2 = !1,
			require(["esri/layers/TiledMapServiceLayer", "esri/SpatialReference", "esri/geometry/Extent", "esri/layers/TileInfo", "dojo/domReady!"],
			function(i, r, o, a) {
				dojo.declare("BaiduLayer_Thematic", esri.layers.TiledMapServiceLayer, {
					constructor: function(i, r) {
						this._mapStyle = i;
						var o = 20037508.3427892;
						this.spatialReference = new esri.SpatialReference({
							wkid: 102100
						}),
						this.fullExtent = new esri.geometry.Extent(( - o), ( - o), o, o, this.spatialReference);
						var a = t.getExtent(e);
						this.initialExtent = new esri.geometry.Extent(a.xmin, a.ymin, a.xmax, a.ymax, this.spatialReference),
						this.tileInfo = new esri.layers.TileInfo({
							rows: 256,
							cols: 256,
							compressionQuality: 0,
							origin: {
								x: -o,
								y: o
							},
							spatialReference: {
								wkid: 102100
							},
							lods: t.getLods()
						}),
						this.loaded = !0,
						this.onLoad(this),
						this.setThematicType(r)
					},
					getTileUrl: function(e, t, i) {
						var r, o = e + 1,
						a = Math.pow(2, e - 1),
						n = a - 1,
						s = i - a,
						l = -t + n;
						return "Vector" == this._mapStyle ? r = bd_api2 + "customimage/tile?&x=" + s + "&y=" + l + "&z=" + o + "&customid=" + this.getThematicType() : "Image" == this._mapStyle ? r = bd_shangetu2 + "it/u=x=" + s + ";y=" + l + ";z=" + o + ";v=009;type=sate&fm=46": "POI" == this._mapStyle && (r = bd_online1 + "tile/?qt=tile&x=" + s + "&y=" + l + "&z=" + o + "&styles=sl&v=041"),
						r
					},
					setThematicType: function(e) {
						e && "string" == typeof e && (this.thematicType = e)
					},
					getThematicType: function() {
						return this.thematicType
					}
				}),
				_gis_funcWaitFlag2 = !0
			})
		},
		e = t
	} (BDLTool),
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
			function(i) {
				if ("MapEvent_MapClick" == e) {
					var r = _utils.convertPoint(i.mapPoint.x, i.mapPoint.y, 16),
					o = new Object;
					o.x = Number(r.x),
					o.y = Number(r.y),
					o.mapEventType = e,
					_utils.callbackFuncRun(t, o)
				}
			}),
			mapDBClickEvent = dojo.connect(_mapObject, "onDblClick",
			function(i) {
				if ("MapEvent_MapDBClick" == e) {
					var r = new Object,
					o = _utils.convertPoint(i.mapPoint.x, i.mapPoint.y, 16);
					r.x = Number(o.x),
					r.y = Number(o.y),
					r.mapEventType = e,
					_utils.callbackFuncRun(t, r)
				}
			}),
			mapExtentChangeEvent = dojo.connect(_mapObject, "onExtentChange",
			function(i) {
				if ("MapEvent_ExtentChange" == e) {
					var r = new Object,
					o = [];
					o[0] = new Object({
						x: i.xmin,
						y: i.ymin
					}),
					o[1] = new Object({
						x: i.xmax,
						y: i.ymax
					});
					var a = _utils.convertPoints(o, 19);
					r.xmin = Number(a[0].x),
					r.ymin = Number(a[0].y),
					r.xmax = Number(a[1].x),
					r.ymax = Number(a[1].y),
					r.mapEventType = e,
					r.level = _mapObject.getLevel(),
					_utils.callbackFuncRun(t, r)
				}
			}),
			mapMouseMoveEvent = dojo.connect(_mapObject, "onMouseMove",
			function(i) {
				if ("MapEvent_MapMouseMove" == e) {
					var r = new Object,
					o = _utils.convertPoint(i.mapPoint.x, i.mapPoint.y, 16);
					r.x = Number(o.x),
					r.y = Number(o.y),
					r.mapEventType = e,
					_utils.callbackFuncRun(t, r)
				}
			}),
			mapOnloadEvent = dojo.connect(_mapObject, "onLoad",
			function(i) {
				if ("MapEvent_MapLoad" == e) {
					var r = new Object;
					r.map = i,
					r.mapEventType = e,
					_utils.callbackFuncRun(t, r)
				}
			}),
			pointMarkClickEvent = dojo.connect(mapPointOverLayer, "onClick",
			function(i) {
				if ("MapEvent_PointMarkerClick" == e) {
					var r = i.graphic.geometry,
					o = i.graphic.symbol,
					a = new Object;
					o.url ? (a.height = o.height, a.width = o.width, a.source = o.url) : (a.color = o.color, "object" == typeof a.color && (a.color = "0x" + _utils.rgbToHexString(a.color.r, a.color.g, a.color.b), a.color = Number(a.color), a.alpha = o.color.a), "string" == typeof a.color && a.color.startsWith("#") && (a.color = a.color.replace("#", "0x"), a.color = Number(a.color)), a.outline = new Object, "object" == typeof o.outline.color && (a.outline.color = "0x" + _utils.rgbToHexString(o.outline.color.r, o.outline.color.g, o.outline.color.b), a.outline.color = Number(a.outline.color), a.outline.alpha = o.outline.color.a), "string" == typeof o.outline.color && o.outline.color.startsWith("#") && (a.outline.color = o.outline.color.replace("#", "0x"), a.outline.color = Number(a.outline.color)), (o.size || 0 == o.size) && (a.size = o.size), o.style && (a.style = o.style), (o.alpha || 0 == o.alpha) && (a.alpha = o.alpha), (o.outline.alpha || 0 == o.outline.alpha) && (a.outline.alpha = o.outline.alpha), o.outline.style && (a.outline.style = o.outline.style), (o.outline.width || 0 == o.outline.width) && (a.outline.width = o.outline.width)),
					a.html = i.graphic.attributes.newcontent,
					a.type = r.type;
					for (var n in r.userAttr) a[n] = r.userAttr[n];
					var s = (new esri.geometry.Point(i.graphic.geometry.x, i.graphic.geometry.y, _mapObject.spatialReference), _utils.convertPoint(r.x, r.y, 16));
					a.x = Number(s.x),
					a.y = Number(s.y),
					a.mapEventType = e,
					a.id = i.graphic.attributes.id,
					_utils.callbackFuncRun(t, a)
				}
			}),
			pointMarkDBClickEvent = dojo.connect(mapPointOverLayer, "onDblClick",
			function(i) {
				if ("MapEvent_PointMarkerDbClick" == e) {
					i.stopPropagation();
					var r = i.graphic.geometry,
					o = i.graphic.symbol,
					a = new Object,
					n = new esri.geometry.Point(r.x, r.y, _mapObject.spatialReference);
					_mapObject.setZoom(_mapObject.getZoom() + 1),
					_mapObject.centerAt(n),
					o.url ? (a.height = o.height, a.width = o.width, a.source = o.url) : (a.color = o.color, "object" == typeof a.color && (a.color = "0x" + _utils.rgbToHexString(a.color.r, a.color.g, a.color.b), a.color = Number(a.color), a.alpha = o.color.a), "string" == typeof a.color && a.color.startsWith("#") && (a.color = a.color.replace("#", "0x"), a.color = Number(a.color)), a.outline = new Object, "object" == typeof o.outline.color && (a.outline.color = "0x" + _utils.rgbToHexString(o.outline.color.r, o.outline.color.g, o.outline.color.b), a.outline.color = Number(a.outline.color), a.outline.alpha = o.outline.color.a), "string" == typeof o.outline.color && o.outline.color.startsWith("#") && (a.outline.color = o.outline.color.replace("#", "0x"), a.outline.color = Number(a.outline.color)), (o.size || 0 == o.size) && (a.size = o.size), o.style && (a.style = o.style), (o.alpha || 0 == o.alpha) && (a.alpha = o.alpha), (o.outline.alpha || 0 == o.outline.alpha) && (a.outline.alpha = o.outline.alpha), o.outline.style && (a.outline.style = o.outline.style), (o.outline.width || 0 == o.outline.width) && (a.outline.width = o.outline.width)),
					a.html = i.graphic.attributes.newcontent,
					a.type = r.type;
					for (var s in r.userAttr) a[s] = r.userAttr[s];
					var l = _utils.convertPoint(r.x, r.y, 16);
					a.x = Number(l.x),
					a.y = Number(l.y),
					a.mapEventType = e,
					a.id = i.graphic.attributes.id,
					_utils.callbackFuncRun(t, a)
				}
			}),
			polygonDBClickEvent = dojo.connect(mapPolygonOverLayer, "onDblClick",
			function(i) {
				if ("MapEvent_PolygonDbClick" == e) {
					i.stopPropagation();
					var r = i.graphic.geometry,
					o = (i.graphic.symbol, new Object),
					a = new esri.geometry.Point(i.mapPoint.x, i.mapPoint.y, _mapObject.spatialReference);
					_mapObject.setZoom(_mapObject.getZoom() + 1),
					_mapObject.centerAt(a),
					o.type = r.type,
					o.alpha = r.userAttr.alpha,
					o.style = r.userAttr.style,
					o.color = r.userAttr.color,
					o.lineAlpha = r.userAttr.lineAlpha,
					o.lineColor = r.userAttr.lineColor,
					o.lineWidth = r.userAttr.lineWidth,
					o.lineStyle = r.userAttr.lineStyle;
					for (var n = r.rings,
					s = [], l = 0; l < n.length; l++) {
						s[l] = new Array;
						for (var c = 0; c < n[l].length; c++) s[l][c] = new Object({
							x: n[l][c][0],
							y: n[l][c][1]
						})
					}
					o.rings = new Array;
					for (var l = 0; l < s.length; l++) {
						var d = _utils.convertPoints(s[l], 19);
						o.rings[l] = new Array;
						for (var u = new Array,
						c = 0; c < d.length; c++) u[c] = new Array,
						u[c].push(d[c].x),
						u[c].push(d[c].y);
						o.rings[l] = u
					}
					var p = _utils.convertPoint(i.mapPoint.x, i.mapPoint.y, 16);
					o.x = Number(p.x),
					o.y = Number(p.y),
					o.mapEventType = e,
					o.id = i.graphic.attributes.id,
					_utils.callbackFuncRun(t, o)
				}
			}),
			polygonClickEvent = dojo.connect(mapPolygonOverLayer, "onClick",
			function(i) {
				if ("MapEvent_PolygonClick" == e) {
					i.stopPropagation();
					var r = i.graphic.geometry,
					o = (i.graphic.symbol, new Object);
					o.type = r.type,
					o.alpha = r.userAttr.alpha,
					o.style = r.userAttr.style,
					o.color = r.userAttr.color,
					o.lineAlpha = r.userAttr.lineAlpha,
					o.lineColor = r.userAttr.lineColor,
					o.lineWidth = r.userAttr.lineWidth,
					o.lineStyle = r.userAttr.lineStyle;
					for (var a = r.rings,
					n = [], s = 0; s < a.length; s++) {
						n[s] = new Array;
						for (var l = 0; l < a[s].length; l++) n[s][l] = new Object({
							x: Number(a[s][l][0]),
							y: Number(a[s][l][1])
						})
					}
					o.rings = new Array;
					for (var s = 0; s < n.length; s++) {
						var c = _utils.convertPoints(n[s], 19);
						o.rings[s] = new Array;
						for (var d = new Array,
						l = 0; l < c.length; l++) d[l] = new Array,
						d[l].push(Number(c[l].x)),
						d[l].push(Number(c[l].y));
						o.rings[s] = d
					}
					var u = _utils.convertPoint(i.mapPoint.x, i.mapPoint.y, 16);
					o.x = Number(u.x),
					o.y = Number(u.y),
					o.mapEventType = e,
					o.id = i.graphic.attributes.id,
					_utils.callbackFuncRun(t, o)
				}
			}),
			polylineClickEvent = dojo.connect(mapLineOverLayer, "onClick",
			function(i) {
				if ("MapEvent_PolyLineClick" == e) {
					i.stopPropagation();
					var r = new Object,
					o = (i.graphic.symbol, i.graphic.geometry);
					r.alpha = o.userAttr.alpha,
					r.color = o.userAttr.color,
					r.width = o.userAttr.width,
					r.style = o.userAttr.style;
					for (var a = o.paths,
					n = [], s = 0; s < a.length; s++) {
						n[s] = new Array;
						for (var l = 0; l < a[s].length; l++) n[s][l] = new Object({
							x: Number(a[s][l][0]),
							y: Number(a[s][l][1])
						})
					}
					r.paths = new Array;
					for (var s = 0; s < n.length; s++) {
						var c = _utils.convertPoints(n[s], 19);
						r.paths[s] = new Array;
						for (var d = new Array,
						l = 0; l < c.length; l++) d[l] = new Array,
						d[l].push(Number(c[l].x)),
						d[l].push(Number(c[l].y));
						r.paths[s] = d
					}
					var u = _utils.convertPoint(i.mapPoint.x, i.mapPoint.y, 16);
					r.x = Number(u.x),
					r.y = Number(u.y),
					r.mapEventType = e,
					r.id = i.graphic.attributes.id,
					_utils.callbackFuncRun(t, r)
				}
			}),
			"MapEvent_PointMarkerDragging" == e && (_utils._gis_PointDrag.dragFlag = !0, _utils._gis_PointDrag.callBackFn = t),
			"MapEvent_PointMarkerDragEnd" == e && (_utils._gis_PointDrag.dragEndFlag = !0, _utils._gis_PointDrag.callBackFnEnd = t)
		},
		addPointMarkers: function(e, t, i, r) {
			if (e) {
				var o = new Array;
				_utils.moveXY(o, e);
				var a = r ? r: 17;
				_utils.moveXY(e, _utils.convertPoints(e, a)),
				_utils.addPoints2Map(e, t, i),
				_utils.moveXY(e, o)
			}
		},
		addPointMarker: function(e, t, i, r, o) {
			if (o) {
				var a = r ? r: 11,
				n = new Object;
				n.x = e.x,
				n.y = e.y;
				var s = _utils.convertPoint(e.x, e.y, a);
				e.x = s.x,
				e.y = s.y,
				_utils.addPoints2Map([e], t, i),
				e.x = n.x,
				e.y = n.y
			} else _utils.addPoint2Map(e, t, i)
		},
		addPolygon: function(e, t, i, r, o, a, n, s, l) {
			if (t) for (var c = new Array,
			d = 0; d < t.length; d++) {
				var u = t[d];
				_utils.moveXY(c, u);
				var p = _utils.parseSingleRing(u, 17),
				y = new esri.geometry.Polygon({
					rings: [p],
					spatialReference: _mapObject.spatialReference
				}),
				m = new esri.Graphic;
				m.setGeometry(y),
				y.userAttr = new Object,
				y.userAttr.alpha = i,
				y.userAttr.style = r,
				y.userAttr.color = o,
				y.userAttr.lineAlpha = a,
				y.userAttr.lineColor = n,
				y.userAttr.lineWidth = s,
				y.userAttr.lineStyle = l;
				var g = new esri.symbol.SimpleLineSymbol;
				g.setColor(_utils.hexToRgbObject(n, a)),
				l && g.setStyle(l),
				isNaN(s) || g.setWidth(s);
				var h = new esri.symbol.SimpleFillSymbol;
				h.setOutline(g),
				0 == i || "0" == i ? h.setStyle(esri.symbol.SimpleLineSymbol.STYLE_NULL) : (h.setColor(_utils.hexToRgbObject(o, i)), r && h.setStyle(r)),
				m.setSymbol(h),
				m.setAttributes({
					id: e
				}),
				mapPolygonOverLayer.add(m),
				_utils.moveXY(u, c)
			}
		},
		addPolyLine: function(e, t, i, r, o, a, n) {
			if (t) for (var s = new Array,
			l = 0; l < t.length; l++) {
				var c = t[l];
				_utils.moveXY(s, c);
				var d = n ? n: 17,
				u = _utils.parseSingleRing(c, d),
				p = new esri.geometry.Polyline({
					paths: [u],
					spatialReference: _mapObject.spatialReference
				}),
				y = new esri.Graphic;
				y.setAttributes({
					id: e
				}),
				y.setGeometry(p),
				p.userAttr = new Object,
				p.userAttr.alpha = i,
				p.userAttr.color = r,
				p.userAttr.width = o,
				p.userAttr.style = a;
				var m = new esri.symbol.SimpleLineSymbol;
				m.setColor(_utils.hexToRgbObject(r, i)),
				a && m.setStyle(a),
				isNaN(o) || m.setWidth(o),
				y.setSymbol(m),
				mapLineOverLayer.add(y),
				_utils.moveXY(c, s)
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
			var i;
			e.address ? (i = new Object({
				address: e.address
			}), e.city && (i.city = e.city)) : e.location && (i = new Object({
				location: e.location.y + "," + e.location.x
			}), e.coordtype && (i.city = e.coordtype), 1 == e.pois && (i.pois = 1)),
			_utils.getBDApiData(bd_api_geocoder, i,
			function(e) {
				_utils.callbackFuncRun(t, e)
			})
		},
		getCoordPoint: function(e, t, i) {
			var r = null;
			return 1 == i ? r = _utils.convertPoint(e, t, 11) : 2 == i && (r = _utils.convertPoint(e, t, 12)),
			r
		},
		getDoubleClickZoomEnabled: function() {
			return _mapObject.isDoubleClickZoom
		},
		getMapExtent: function() {
			if (_mapObject) {
				var e = _mapObject.extent,
				t = new Object,
				i = new Array;
				i[0] = new Object({
					x: e.xmin,
					y: e.ymin
				}),
				i[1] = new Object({
					x: e.xmax,
					y: e.ymax
				});
				var r = _utils.convertPoints(i, 19);
				return t.xmin = Number(r[0].x),
				t.ymin = Number(r[0].y),
				t.xmax = Number(r[1].x),
				t.ymax = Number(r[1].y),
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
		getTwoPointDistanceByBatch: function(e, t, i) {
			var r = new Array;
			if (null != pointArray && pointArray.length > 0) for (var o = 0; o < pointArray.length; o++) {
				var a = pointArray[o];
				_utils.getTwoPointDistanceForWgs84(a, oneP) <= i && r.push(a.id)
			}
			return r.length > 0 && r
		},
		hideInternalLayer: function(e) {
			var t = _utils.hideLayer(e);
			if (!t) {
				var i = _utils.getLayerUrl(e);
				return i ? void _utils.hideLayer(i) : void 0
			}
		},
		init: function() {
			var e = this;
			_utils = new UtilsForGis(e),
			_utils.showLoadingDiv(),
			_utils.thCurrentType = e.NORMAL,
			_utils.setTransformPoint(e.transformPoint);
			var t = !!window.esri;
			t || (loadExtentFile(url_jsapi + "jsapi/3.13/esri/css/esri.css", "css"), loadExtentFile(url_jsapi + "jsapi/3.13/dijit/themes/tundra/tundra.css", "css"), loadExtentFile(resource_pro + "api/extra/_gisStyleFix.css", "css"), loadExtentFile(url_jsapi + "jsapi/3.13/init.js", "js"));
			var i = function() {
				t = !!window.esri,
				t ? (_mapObject && (_mapObject.removeAllLayers(), _mapObject.destroy()), dojo.io.script.get({
					url: url_gis_mng + "pub/RSA/getPublicKey.do",
					callbackParamName: "callback",
					load: function(e) {
						e && e.modulus && e.exponent ? (_utils.publicKey = new _utils.RSAUtils.getKeyPair(e.exponent, "", e.modulus), _utils._initGis()) : alert("获取公钥失败，无法验证用户身份")
					},
					error: function(e) {
						console.debug(e)
					}
				})) : setTimeout(i, 50)
			};
			try {
				i()
			} catch(r) {
				console.log(r)
			}
		},
		isPointInPolygon: function(e, t) {
			var i = 0,
			r = e.x,
			o = e.y;
			if (t && t.length > 2) for (var a = 0; a < t.length; a++) {
				var n = t[a].x,
				s = t[a].y,
				l = t[(a + 1) % t.length].x,
				c = t[(a + 1) % t.length].y;
				if (s != c) {
					if (s >= o && o >= c || c >= o && o >= s) {
						var d = (l - n) * (o - s) / (c - s) + n;
						if (d == r) return ! 0;
						if (d > r) {
							var u = s < c ? s: c;
							u != o && i++
						}
					}
				} else if ((n >= r && r >= l || l >= r && r >= n) && o == s) return ! 0
			}
			return i % 2 == 1
		},
		moveToTopById: function(e, t) {
			var i = null,
			r = _mapObject._layerSize;
			if (e && "string" == typeof e && "" != e && (i = _mapObject.getLayer(e)), t && "string" == typeof t && "" != t) switch (r = _mapObject._layerSize, t) {
			case "point":
				i = _mapObject.getLayer("pointLayer");
				break;
			case "ellipse":
				i = _mapObject.getLayer("ellipseLayer");
				break;
			case "label":
				i = _mapObject.getLayer("labelLayer");
				break;
			case "line":
				i = _mapObject.getLayer("lineLayer");
				break;
			case "polygon":
				i = _mapObject.getLayer("polygonLayer")
			}
			null != i && _mapObject.reorderLayer(i, ++r)
		},
		removeEcllipseById: function(e) {
			0 != mapEllipseLayer.graphics.length && _utils.removeGraphic(e, mapEllipseLayer)
		},
		removeLabelMarkersById: function(e) {
			0 != mapLabelOverLayer.graphics.length && _utils.removeGraphic(e, mapLabelOverLayer)
		},
		removeMapEventListener: function(e, t) {
			"MapEvent_ExtentChange" == e ? dojo.disconnect(mapExtentChangeEvent) : "MapEvent_MapClick" == e ? dojo.disconnect(mapClickEvent) : "MapEvent_MapDBClick" == e ? dojo.disconnect(mapDBClickEvent) : "MapEvent_MapLoad" == e ? dojo.disconnect(mapOnloadEvent) : "MapEvent_MapMouseMove" == e ? dojo.disconnect(mapMouseMoveEvent) : "MapEvent_PointMarkerClick" == e ? dojo.disconnect(pointMarkClickEvent) : "MapEvent_PointMarkerDbClick" == e ? dojo.disconnect(pointMarkDBClickEvent) : "MapEvent_PointMarkerDragging" == e ? (_utils._gis_PointDrag.dragFlag = !1, _utils._gis_PointDrag.callBackFn = null) : "MapEvent_PointMarkerDragEnd" == e ? (_utils._gis_PointDrag.dragEndFlag = !1, _utils._gis_PointDrag.callBackFnEnd = null) : "MapEvent_PolygonClick" == e ? dojo.disconnect(polygonClickEvent) : "MapEvent_PolygonDbClick" == e ? dojo.disconnect(polygonDBClickEvent) : "MapEvent_PolyLineClick" == e && dojo.disconnect(lineClickEvent)
		},
		removePointMarkersById: function(e) {
			0 != mapPointOverLayer.graphics.length && _utils.removeGraphic(e, mapPointOverLayer)
		},
		removePolygonsById: function(e) {
			0 != mapPolygonOverLayer.graphics.length && _utils.removeGraphic(e, mapPolygonOverLayer)
		},
		removePolyLinesById: function(e) {
			0 != mapLineOverLayer.graphics.length && _utils.removeGraphic(e, mapLineOverLayer)
		},
		searchAddress: function(e, t, i) {
			if (! (e.level2 && "" != e.level2 || e.level3 && "" != e.level3 || e.level4 && "" != e.level4 || e.level5 && "" != e.level5)) {
				var r = new Object({
					status: !1,
					count: 0,
					results: []
				});
				_utils.callbackFuncRun(i, r)
			}
			var o = e.level2 ? encodeURIComponent(encodeURIComponent(e.level2)) : "",
			a = e.level3 ? encodeURIComponent(encodeURIComponent(e.level3)) : "",
			n = e.level4 ? encodeURIComponent(encodeURIComponent(e.level4)) : "",
			s = e.level5 ? encodeURIComponent(encodeURIComponent(e.level5)) : "",
			l = e.page,
			c = e.rows,
			d = url_prefix;
			d += "gisManager/pub/search/seachAddress.do";
			var u = "ukey=7F57F6B3A53C49F98EBDAB28CF5A48E8&level2=";
			u += o,
			u += "&level3=",
			u += a,
			u += "&level4=",
			u += n,
			u += "&level5=",
			u += s,
			u += l ? "&page=" + l: "&page=1",
			u += c ? "&rows=" + c: "&rows=20",
			1 == Number(t) && _utils.showLoadingUniversal(),
			this._gisRequest(d, !1, sendData,
			function(e) {
				var r = JSON.parse(e)[0];
				1 == Number(t) && "success" == r.status && Number(r.count) > 0 && _utils.showSearchAddress(r),
				_utils.hideLoadingUniversal("mapLoadingStatus"),
				_utils.callbackFuncRun(i, r)
			})
		},
		searchAddress_Detail: function(e, t) {
			var i = {};
			if (e.poiId) i.uid = e.poiId;
			else {
				if (!e.poiIds) return void _utils.returnError(t);
				if (i.uids = "", Array.isArray(e.poiIds)) i.uids = e.poiIds.join(",");
				else if ("object" == typeof e.poiIds) {
					var r = [];
					for (var o in e.poiIds) r.push(e.poiIds[o]);
					i.uids = r.join(",")
				}
			}
			i.scope = e.scope ? e.scope: 1,
			_utils.getBDApiData(bd_api_place + "detail", i,
			function(e) {
				_utils.callbackFuncRun(t, e)
			})
		},
		searchAddress_BD: function(e, t, i) {
			if (null == e.searchText || "" == e.searchText) return void _utils.returnError(t);
			var r = dojo.attr(dojo.byId("_gisCurrentCityBtn"), "innerHTML"),
			r = r ? r: this.districtName,
			o = e.cityText ? e.cityText: r,
			a = e.page_num && !isNaN(e.page_num) ? Number(e.page_num) : 0;
			a - 1 >= 0 && (a -= 1);
			var n = new Object({
				query: e.searchText,
				region: o,
				scope: 2,
				page_num: a
			});
			e.tag && (n.tag = e.tag),
			(e.bounds || e.bds) && (n.bds = e.bounds || e.bds),
			(e.radius || e.r) && (n.r = e.radius || e.r),
			e.location && (n.location = e.location),
			e.city_limit && (n.city_limit = e.city_limit),
			_utils.getBDApiData(bd_api_place + "search", n,
			function(e) {
				if (i) var r = _utils.formatPoiData_forSearchBar(e, a);
				else var r = _utils.formatPoiData(e);
				_utils.callbackFuncRun(t, r)
			})
		},
		searchAddress_Suggestion: function(e, t) {
			if (null == e.searchText || "" == e.searchText) return void _utils.returnError(t);
			var i = dojo.attr(dojo.byId("_gisCurrentCityBtn"), "innerHTML"),
			r = e.cityText ? e.cityText: i ? i: this.districtName,
			o = new Object({
				query: e.searchText,
				region: r
			});
			_utils.getBDApiData(bd_api_place + "suggestion", o,
			function(e) {
				_utils.callbackFuncRun(t, e)
			})
		},
		setBaseMap: function(e) {
			var t = e && "" != e ? e.toUpperCase() : null;
			return t = t ? t = this[t] : null,
			!!t && _utils.switchBaseMap(t)
		},
		setDoubleClickZoomEnabled: function(e) {
			e ? _mapObject.enableDoubleClickZoom() : _mapObject.disableDoubleClickZoom()
		},
		setMapCenter: function(e) {
			var t;
			t = e.type ? _utils.convertPoint(e.x, e.y, e.type) : _utils.convertPoint(e.x, e.y, 11);
			var i = new esri.geometry.Point(t.x, t.y, _mapObject.spatialReference);
			_mapObject.centerAt(i)
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
			var i = _utils.convertPoints(t, 17),
			r = new esri.geometry.Extent(Number(i[0].x), Number(i[0].y), Number(i[1].x), Number(i[1].y), _mapObject.spatialReference);
			_mapObject.setExtent(r)
		},
		setMapLevel: function(e) {
			isNaN(e) || (e < 0 ? _mapObject.setLevel(0) : e > 16 && _mapObject.setLevel(16), _mapObject.setLevel(e))
		},
		setMapScale: function(e) {
			_mapObject.setScale(e)
		},
		setModuleShow: function(e) {
			this.modouleConfig = e;
			var t, i = this,
			r = function() {
				_gis_mapWaitFlag ? (t = dojo.byId("_gis_WidgetsContainer"), t || (t = dojo.create("div", {
					id: "_gis_WidgetsContainer"
				}), dojo.place(t, dojo.byId(i.divID + "_root"), "last"), dojo.style(t, {
					position: "absolute",
					top: "30px",
					left: "60px"
				})), null == e ? (o("_gis_MeasureWidget"), o("_gis_searchBar_main_container"), a("_gis_Citybox", i.gisToolBar.citySwitch), a("_gis_Switch_BaseMap", i.gisToolBar.showSwitchDiv)) : (1 == Number(e.searchShow) ? a("_gis_searchBar_main_container", i.gisToolBar.searchBar) : o("_gis_searchBar_main_container"), e.searchResultShow = isNaN(e.searchResultShow) || 1 != Number(e.searchResultShow) ? 0 : 1, 1 == Number(e.distanceMeasurementShow) ? a("_gis_MeasureWidget", _utils.createMeasureButton) : o("_gis_MeasureWidget"), 1 == Number(e.distShow) ? a("_gis_Citybox", i.gisToolBar.citySwitch) : o("_gis_Citybox"), 1 == Number(e.switchMapShow) ? a("_gis_Switch_BaseMap", i.gisToolBar.showSwitchDiv) : o("_gis_Switch_BaseMap"))) : setTimeout(r, 50)
			},
			o = function(e) {
				t = dojo.byId(e),
				t && esri.hide(t)
			},
			a = function(e, i) {
				t = dojo.byId(e),
				t ? esri.show(t) : i()
			};
			r()
		},
		showInternalLayer: function(e, t) {
			if (_mapObject.getLayer(e)) return void _mapObject.getLayer(e).show();
			if (0 == businessLayerManager) return void alert("不能访问业务图层");
			var i, r, o = null;
			if (_utils.showMapLoading(), o = _utils.getLayerUrl(e), !o) return alert("未能正确获取图层，请确认图层id"),
			void console.log("图层地址获取失败");
			try {
				i = JSON.parse(bizLayer[e].option)
			} catch(a) {
				i = void 0
			}
			1 == bizLayer[e].type ? (i || (i = {
				outFields: ["*"],
				mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
				opacity: .6
			}), o += i.urlTail ? i.urlTail: "/0", r = _utils.addInternalLayer(e, o, i, bizLayer[e].type)) : 2 == bizLayer[e].type ? (o += i && i.urlTail ? i.urlTail: "/0", r = _utils.addInternalLayer(e, o, t, bizLayer[e].type), _utils.setLayerSettings(r, i)) : (r = _utils.addInternalLayer(e, o), _utils.setLayerSettings(r, i))
		},
		showInternalLayer_dist_district: function(e, t, i, r, o) {
			var a = _mapObject.getLayer(e);
			if (null != a && a.show(), "" != e && null == _mapObject.getLayer(e)) {
				var n = _utils.addLayerFun(e);
				require(["esri/tasks/query", "esri/tasks/QueryTask"],
				function(t, i) {
					_utils.showMapLoading(!0);
					var r = new esri.tasks.QueryTask(coverareadistUrl + "/0"),
					o = new esri.tasks.Query;
					o.returnGeometry = !0,
					o.outFields = ["*"],
					o.where = "layerid = '" + e + "'",
					r.execute(o,
					function(e) {
						if (0 != e.features.length) {
							for (var t = new esri.geometry.Extent,
							i = 0; i < e.features.length; i++) {
								var r = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 0, 255, .35]), 1), new dojo.Color([125, 125, 125, .6])),
								o = e.features[i];
								o.setSymbol(r),
								n.add(o),
								t = 0 == i ? o.geometry.getExtent() : t.union(o.geometry.getExtent())
							}
							_mapObject.setExtent(t)
						}
					})
				})
			}
		},
		showTipOfPointMarker: function(e, t, i) {
			var r = mapPointOverLayer.graphics;
			_utils.hideInfoWindow();
			for (var o = 0; o < r.length; o++) {
				var a = r[o];
				if (a.attributes.id == e) {
					i || (t = a.attributes.newcontent);
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
		showTipOfPointMarker_set: function(e, t, i, r, o) {
			var a = mapPointOverLayer.graphics;
			_utils.hideInfoWindow();
			for (var n = 0; n < a.length; n++) {
				var s = a[n];
				if (s.attributes.id == e) {
					i || (t = s.attributes.newcontent);
					var l = new Object({
						width: r,
						height: o,
						title: "",
						content: t,
						graphic: s
					});
					_utils.infoWindowOpen(l)
				}
			}
		}
	},
	Gis.destroy = function() {
		_mapObject && _mapObject.destroy()
	},
	Gis.__extendGis = function(e, t) {
		if (e.extend) if (t) for (var i in e)"extend" != i && (UtilsForGis.prototype[i] = e[i]);
		else for (var i in e)"extend" != i && (Gis.prototype[i] = e[i])
	},
	Gis.getUtils = function() {
		return _utils
	},
	Gis.prototype.addDistDemoMapLayer = function(e) {
		var t = _mapObject.getLayer(e);
		if (t) return _utils.showMapLoading(),
		void t.show();
		_utils.showMapLoading();
		var i = url_mapSvr_zj + "CELL_FLOW_HEAT/MapServer";
		_utils.addLayer(i, !0, 1, e)
	},
	Gis.prototype.showStyleLayer = function(e) {
		_utils.showMapLoading();
		var t = url_mapSvr_zj + "COVER_AREA_NEWDATA_RXLEV/MapServer/0",
		i = _utils.getRenderer(e),
		r = _mapObject.getLayer(e);
		void 0 != r && _mapObject.removeLayer(r),
		r = _utils.addLayerFun(e, !1, t, "featureLayer", esri.layers.FeatureLayer.MODE_ONDEMAND),
		i && _utils.editStyleToLayer(r, i, "polygon")
	},
	Gis.prototype.setLayerRenderer = function(e, t, i, r, o) {
		_utils.showMapLoading();
		var a = _mapObject.getLayer(e);
		if (void 0 == a) return "Not Found Layer";
		var n = new Object;
		t.style && (n.style = t.style),
		t.color && (n.color = t.color),
		t.size && (n.size = t.size),
		t.alpha && (n.alpha = t.alpha),
		n.lineAttr = new Object,
		i.style && (n.lineAttr.style = i.style),
		i.color && (n.lineAttr.color = i.color),
		i.width && (n.lineAttr.width = i.width),
		i.alpha && (n.lineAttr.alpha = i.alpha),
		_utils.editStyleToLayer(a, n, r, o)
	},
	Gis.prototype.setLayerRendererBySymbols = function(e, t, i) {
		function r() {
			var t = _utils.getLayerUrl(e);
			if (null == t) return "Not Found Layer";
			var i = {
				outFields: ["*"],
				mode: esri.layers.FeatureLayer.MODE_SNAPSHOT
			};
			o = _utils.addLayerFun(e, !1, t + "/0", "featureLayer", i)
		}
		_utils.showMapLoading();
		var o = _mapObject.getLayer(e);
		void 0 == o ? r() : "esri.layers.ArcGISDynamicMapServiceLayer" == o.declaredClass && (_mapObject.removeLayer(o), r()),
		_utils.changeCustRangeMarker(o, t, i),
		o.refresh()
	},
	Gis.prototype.showHeatMapLayer = function(e, t) {
		var i = null;
		if (_utils.showMapLoading(), i = _utils.getLayerUrl(e)) {
			var r = _utils.addHeatMapLayer(e, i + "/0", t, !0);
			r && r.show()
		}
	},
	Gis.prototype.gisToolBar = new Object,
	Gis.prototype.gisToolBar.toolEntity = null,
	Gis.prototype.gisToolBar.drawGraphic = function(e, t, i, r, o, a, n) {
		var s, l, c, d, u = _utils.getGisObject(),
		p = this.toolEntity;
		r ? "string" == typeof r ? (s = _mapObject.getLayer(r), s || (s = mapGraphicLayer)) : s = r: s = mapGraphicLayer,
		require(["esri/toolbars/draw", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/graphic", "esri/Color", "dojo/dom", "dojo/on", "dojo/domReady!"],
		function(r, y, m, g, h, _, b, v) {
			function f(r) {
				p.deactivate(),
				p = null,
				_mapObject.enableMapNavigation();
				var o, a = r.geometry;
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
					o = w,
					t && (0 == t.alpha || "0" == t.alpha ? o.setStyle("none") : (o.setColor(_utils.hexToRgbObject(t.color, t.alpha)), t.style && o.setStyle(t.style)), t.lineAttr && (S.setColor(_utils.hexToRgbObject(t.lineAttr.color, t.lineAttr.alpha)), t.lineAttr.style && S.setStyle(t.lineAttr.style), isNaN(t.lineAttr.width) || S.setWidth(t.lineAttr.width), o.setOutline(S)));
					break;
				case u.DRAW_LINE:
				case u.DRAW_POLYLINE:
				case u.DRAW_FREEHAND_POLYLINE:
					o = S,
					t && (o.setColor(_utils.hexToRgbObject(t.color, t.alpha)), t.style && o.setStyle(t.style), isNaN(t.width) || o.setWidth(t.width));
					break;
				case u.DRAW_POINT:
				case u.DRAW_MULTI_POINT:
					o = L,
					t && (o.setColor(_utils.hexToRgbObject(t.color, t.alpha)), t.style && o.setStyle(t.style), t.lineAttr && (S.setColor(_utils.hexToRgbObject(t.lineAttr.color, t.lineAttr.alpha)), t.lineAttr.style && S.setStyle(t.lineAttr.style), isNaN(t.lineAttr.width) || S.setWidth(t.lineAttr.width), o.setOutline(S)))
				}
				if (s.add(new h(a, o)), c && dojo.disconnect(c), d && dojo.disconnect(d), i) {
					var n;
					if ("point" == a.type) n = _utils.convertPoint(a.x, a.y, 16),
					n = [n];
					else {
						if ("extent" == a.type) {
							var l = _utils.convertPoints([{
								x: a.xmin,
								y: a.ymin
							},
							{
								x: a.xmax,
								y: a.ymax
							}], 19);
							n = {
								xmin: l[0].x,
								ymin: l[0].y,
								xmax: l[1].x,
								ymax: l[1].y
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
					_utils.callbackFuncRun(i, n)
				}
			}
			var S = new m("solid", new _([255, 0, 0]), 1),
			L = new y("circle", 10, S, new _([47, 192, 204, .8])),
			w = new g("solid", S, new _([255, 255, 0, .25]));
			_mapObject.disableMapNavigation(),
			p && (p.deactivate(), p = null),
			p = new r(_mapObject),
			p.on("draw-end", f),
			o && "function" == typeof o && (l = p.on("draw-end", o)),
			a && "function" == typeof a && (c = dojo.connect(_mapObject, "onClick", a)),
			n && "function" == typeof n && (d = dojo.connect(_mapObject, "onDblClick", n)),
			p.activate(e),
			s.clear()
		})
	},
	Gis.prototype.gisToolBar.drawMeasureGraphic = function() {
		var e = this.toolEntity,
		t = _mapObject.getLayer("startMeasureLayer");
		t && _mapObject.removeLayer(t),
		t = _utils.addLayerFun("startMeasureLayer");
		var i, r = new Array,
		o = 0,
		a = 0,
		n = 55;
		require(["esri/toolbars/draw", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/graphic", "esri/Color", "dojo/dom", "dojo/dom-construct", "dojo/on", "dojo/domReady!"],
		function(s, l, c, d, u, p, y, m) {
			function g(i) {
				e.deactivate(),
				e = null,
				_mapObject.enableMapNavigation(),
				dojo.disconnect(S),
				dojo.disconnect(L),
				t.add(new d(i.geometry, f))
			}
			function h(e, t) {
				var i = new esri.Graphic,
				r = new esri.geometry.Point(e.x, e.y, _mapObject.spatialReference);
				i.setAttributes({
					newcontent: e.html,
					id: e.id,
					canShowTip: e.canShowTip
				}),
				i.setGeometry(r);
				var o = new Image;
				if (o.src = e.source, o.complete) {
					var a = new esri.symbol.PictureMarkerSymbol(o.src, o.width, o.height);
					i.setSymbol(a),
					t.add(i)
				} else o.tGraphic = i,
				o.onload = function() {
					var e = new esri.symbol.PictureMarkerSymbol(this.src, this.width, this.height);
					this.tGraphic.setSymbol(e),
					t.add(this.tGraphic)
				}
			}
			function _(e, t, i) {
				var r = t / 1e3;
				return 0 == o ? (n = 45, b(e, "起始点", 0)) : i ? (n = 120, b(e, "总长：" + r.toFixed(2) + "公里", 1)) : (n = 75, b(e, r.toFixed(2) + "公里"))
			}
			function b(e, i, r) {
				var o = new Array,
				a = new esri.geometry.Point(e.x, e.y, _mapObject.spatialReference),
				s = new esri.Graphic;
				o.push(s);
				var l = new esri.symbol.PictureMarkerSymbol({
					url: url_image + "bg_blue.png",
					height: 20,
					width: n
				});
				l.setOffset(50, 20),
				s.setSymbol(l),
				s.setGeometry(a),
				t.add(s),
				s = new esri.Graphic,
				o.push(s),
				s.setGeometry(a);
				var c = new esri.symbol.Font("Microsoft YaHei");
				c.setSize(10);
				var d = new esri.symbol.TextSymbol({
					text: i,
					color: new esri.Color([0, 0, 255, 1]),
					font: c
				});
				return d.setOffset(50, 14),
				s.setSymbol(d),
				t.add(s),
				1 == r && v(e),
				o
			}
			function v(e) {
				var i = new esri.Graphic;
				i.setAttributes({
					id: "remove_Measure"
				});
				var r = new esri.symbol.PictureMarkerSymbol(url_image + "return_icon_03.png", 24, 24);
				r.setOffset(20, -30),
				i.setSymbol(r);
				var o = new esri.geometry.Point(e.x, e.y, _mapObject.spatialReference);
				i.setGeometry(o),
				t.add(i),
				dojo.connect(t, "onClick",
				function(e) {
					null != e.graphic.attributes && "remove_Measure" == e.graphic.attributes.id && (t.clear(), _mapObject.removeLayer(t))
				})
			}
			var f = new l(l.STYLE_SOLID, new u([255, 0, 0]), 2);
			_mapObject.disableMapNavigation(),
			e && (e.deactivate(), e = null),
			e = new s(_mapObject),
			e.on("draw-end", g);
			var S = dojo.connect(_mapObject, "onDblClick",
			function(e) {
				t.remove(i[0]),
				t.remove(i[1]);
				var n = {
					id: "measurePoint" + o,
					x: e.mapPoint.x,
					y: e.mapPoint.y,
					source: url_image + "fav_icon.png",
					html: '<span>测试点001,<a href="http://www.10086.cn" target="_blank" color="#ff0000">点击</a>打开移动</span>',
					canShowTip: !0
				},
				s = [{
					x: r[o - 1].x,
					y: r[o - 1].y
				},
				{
					x: n.x,
					y: n.y
				}];
				s = _utils.convertPoints(s, 19),
				a += Number(_utils.getTwoPointDistanceForWgs84(s[0], s[1])),
				_(n, a, !0),
				r.push(n)
			}),
			L = dojo.connect(_mapObject, "onClick",
			function(e) {
				var n = {
					id: "measurePoint" + o,
					x: e.mapPoint.x,
					y: e.mapPoint.y,
					source: url_image + "fav_icon.png",
					html: '<span>测试点001,<a href="http://www.10086.cn" target="_blank" color="#ff0000">点击</a>打开移动</span>',
					canShowTip: !0
				};
				if (0 != o) {
					var s = [{
						x: r[o - 1].x,
						y: r[o - 1].y
					},
					{
						x: n.x,
						y: n.y
					}];
					s = _utils.convertPoints(s, 19),
					a += Number(_utils.getTwoPointDistanceForWgs84(s[0], s[1]))
				}
				i = _(n, a, !1),
				h(n, t),
				r.push(n),
				o += 1
			});
			e.activate("polyline"),
			t.clear()
		})
	},
	Gis.prototype.gisToolBar.searchBar = function() {
		var e = "_gis_searchBar",
		t = _utils.getGisObject(),
		i = _utils.stfg = new SearchToolForGis(t);
		return pnel = dojo.byId(e + "_main_container"),
		pnel ? void esri.show(pnel) : void i.createSearchBarContainer(e)
	},
	Gis.prototype.gisToolBar.showSwitchDiv = function() {
		var e = _utils.getGisObject();
		require(["dojo/on", "dojo/mouse", "dojo/touch", "dojo/domReady!"],
		function(t, i, r) {
			function o(e) {
				dojo.style(e, {
					width: "80px",
					height: "60px",
					margin: "5px",
					"float": "left"
				});
				var r = dojo.create("div", {
					id: dojo.attr(e, "id") + "_ov",
					innerHTML: dojo.attr(e, "thematicType")
				});
				dojo.style(r, {
					height: "20px",
					backgroundColor: "black",
					color: "white",
					display: "none",
					"float": "left"
				}),
				dojo.place(r, e),
				dojo.attr(e, "title", dojo.attr(e, "thematicType").toLocaleUpperCase()),
				t(e, i.enter,
				function(e) {
					dojo.style(r, {
						display: "block"
					})
				}),
				t(e, i.leave,
				function(e) {
					dojo.style(r, {
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
			s = dojo.create("div", {
				id: "panorama_dark",
				thematicType: e.DARK
			}),
			l = dojo.create("div", {
				id: "panorama_light",
				thematicType: e.LIGHT
			}),
			c = dojo.create("div", {
				id: "panorama_grassgreen",
				thematicType: e.GRASSGREEN
			}),
			d = dojo.create("div", {
				id: "panorama_redalert",
				thematicType: e.REDALERT
			}),
			u = dojo.create("div", {
				id: "panorama_midnight",
				thematicType: e.MIDNIGHT
			}),
			p = dojo.create("div", {
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
				thematicType: e.SATELLITE
			}),
			v = dojo.create("div", {
				id: "panorama_normal",
				thematicType: e.NORMAL
			}),
			f = dojo.create("div", {
				id: "panorama_current",
				thematicType: e.NORMAL
			}),
			S = dojo.create("div"),
			L = dojo.create("div"),
			w = dojo.create("div");
			dojo.style(n, {
				position: "absolute",
				padding: "5px",
				zIndex: "2",
				right: "20px",
				bottom: "20px",
				cursor: "pointer"
			}),
			o(s),
			dojo.style(s, {
				backgroundImage: "url(" + url_image + "LayerView/dark.png)"
			}),
			o(l),
			dojo.style(l, {
				backgroundImage: "url(" + url_image + "LayerView/light.png)"
			}),
			o(c),
			dojo.style(c, {
				backgroundImage: "url(" + url_image + "LayerView/grassgreen.png)"
			}),
			o(u),
			dojo.style(u, {
				backgroundImage: "url(" + url_image + "LayerView/midnight.png)"
			}),
			o(d),
			dojo.style(d, {
				backgroundImage: "url(" + url_image + "LayerView/redalert.png)"
			}),
			o(p),
			dojo.style(p, {
				backgroundImage: "url(" + url_image + "LayerView/pink.png)"
			}),
			o(y),
			dojo.style(y, {
				backgroundImage: "url(" + url_image + "LayerView/darkgreen.png)"
			}),
			o(m),
			dojo.style(m, {
				backgroundImage: "url(" + url_image + "LayerView/bluish.png)"
			}),
			o(g),
			dojo.style(g, {
				backgroundImage: "url(" + url_image + "LayerView/grayscale.png)"
			}),
			o(h),
			dojo.style(h, {
				backgroundImage: "url(" + url_image + "LayerView/hardedge.png)"
			}),
			o(_),
			dojo.style(_, {
				backgroundImage: "url(" + url_image + "LayerView/googlelite.png)"
			}),
			o(b),
			dojo.style(b, {
				backgroundImage: "url(" + url_image + "LayerView/maptype.png)",
				backgroundPosition: "0 -60px"
			}),
			o(v),
			dojo.style(v, {
				backgroundImage: "url(" + url_image + "LayerView/maptype.png)",
				display: "none"
			}),
			o(f),
			dojo.style(f, {
				backgroundImage: "url(" + url_image + "LayerView/maptype.png)",
				display: "block"
			}),
			navigator.userAgent.indexOf("MSIE") > 0 ? navigator.userAgent.indexOf("MSIE 8.0") > 0 || navigator.userAgent.indexOf("MSIE 7.0") > 0 || navigator.userAgent.indexOf("MSIE 6.0") > 0 ? (dojo.style(S, {
				width: "368px",
				height: "216px",
				"float": "right",
				display: "none",
				background: "#66ffcc"
			}), dojo.style(L, {
				width: "90px",
				height: "70px",
				clear: "both",
				"float": "right",
				background: "#66ffcc"
			})) : (dojo.style(S, {
				width: "360px",
				height: "210px",
				"float": "right",
				display: "none",
				backgroundColor: "rgba(124,124,124,0.6)"
			}), dojo.style(L, {
				"float": "right",
				backgroundColor: "rgba(124,124,124,0.6)"
			})) : (dojo.style(S, {
				width: "360px",
				height: "210px",
				display: "none",
				backgroundColor: "rgba(124,124,124,0.6)"
			}), dojo.style(L, {
				"float": "right",
				backgroundColor: "rgba(124,124,124,0.6)"
			})),
			dojo.style(w, {
				width: "270px",
				height: "70px",
				"float": "left"
			}),
			dojo.place(S, n, "last"),
			dojo.place(s, S, "last"),
			dojo.place(l, S, "last"),
			dojo.place(c, S, "last"),
			dojo.place(u, S, "last"),
			dojo.place(d, S, "last"),
			dojo.place(p, S, "last"),
			dojo.place(y, S, "last"),
			dojo.place(m, S, "last"),
			dojo.place(g, S, "last"),
			dojo.place(h, S, "last"),
			dojo.place(_, S, "last"),
			dojo.place(b, S, "last"),
			dojo.place(w, n, "last"),
			dojo.place(L, n, "last"),
			dojo.place(v, L, "last"),
			dojo.place(f, L, "last"),
			dojo.place(n, dojo.byId(e.divID + "_root"), "first"),
			t(n, i.enter,
			function(e) {
				dojo.style(S, {
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
			t(n, i.leave,
			function(e) {
				dojo.style(S, {
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
			t(w, i.enter,
			function(e) {
				dojo.style(S, {
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
		return t ? void esri.show(t) : (dojo.place(_cityBox_String, dojo.byId("_gis_WidgetsContainer"), "last"), void require(["dojo/on", "dojo/dom-construct"],
		function(t, i) {
			var r = dojo.query("._gis-city-item", e.divID + "_root"),
			o = dojo.query("._gis-to-dist-item", e.divID + "_root"),
			a = dojo.byId("_gisDropDownBtn");
			t(a, "click",
			function(e) {
				var t = "▼" == a.innerHTML;
				a.innerHTML = t ? "▲": "▼",
				t ? esri.show(dojo.query("._gis-city-panel")[0]) : esri.hide(dojo.query("._gis-city-panel")[0])
			}),
			t(dojo.byId("_gisCurrentCityBtn"), "click",
			function(t) {
				var i = t.currentTarget.innerHTML;
				i = _utils.city_DistCoord[i],
				e.setMapCenter(i)
			}),
			t(dojo.byId("_gis_cityPannelClose"), "click",
			function(e) {
				esri.hide(dojo.query("._gis-city-panel")[0]),
				a.innerHTML = "▼"
			}),
			r.forEach(function(i) {
				t(i, "click",
				function(t) {
					var i = t.currentTarget.innerHTML,
					r = dojo.attr(dojo.byId("_gisCurrentCityBtn"), "innerHTML");
					if (i != r) {
						cPoint = _utils.city_DistCoord[i],
						r = dojo.byId("_gis_cityCurrent");
						var o = "景宁县" == i ? "景宁畲族自治县": i;
						r.innerHTML = cPoint.p ? cPoint.p + o: o,
						r = dojo.byId("_gisCurrentCityBtn"),
						r.innerHTML = i,
						e.setMapCenter(cPoint)
					}
				})
			}),
			o.forEach(function(e) {
				t(e, "click",
				function(e) {
					var t = e.currentTarget.innerHTML,
					i = dojo.byId("_gis-city-dist-dl"),
					r = i.scrollHeight;
					if ("W" == t || "Z" == t) i.scrollTop = r;
					else if ("H" == t) i.scrollTop = 0;
					else {
						var o = dojo.attr(e.currentTarget, "sTop");
						o = o / r * r,
						i.scrollTop = o
					}
				})
			})
		}))
	};
	var spatialGeometry = null,
	handler = null,
	tb = null,
	showSpacial = Gis.showSpacial = function(e) {
		var t = e.MAXX ? e.MAXX: "",
		i = e.MINY ? e.MINY: "",
		r = new esri.geometry.Point(t, i, _mapObject.spatialReference),
		o = new esri.symbol.PictureMarkerSymbol("../image/BuildingView/flat-marker-.png", 16, 24),
		a = new esri.Graphic(r, o);
		a.setAttributes({
			x: t,
			y: i
		}),
		mapSpatialLayer.add(a)
	};
	Gis.prototype.addSpatialComputing = function(e) {
		require(["esri/toolbars/draw"],
		function(t) {
			tb || addMeasureServer(),
			0 == e ? tb.activate(esri.toolbars.Draw.POINT) : 1 == e ? tb.activate(esri.toolbars.Draw.POLYLINE) : 2 == e ? (handler && (handler = dojo.disconnect(handler)), tb.activate(esri.toolbars.Draw.POLYGON), handler = dojo.connect(geometryService, "onAreasAndLengthsComplete", outputAreaAndLength)) : 3 == e ? (null != handler && (handler = dojo.disconnect(handler)), tb.activate(esri.toolbars.Draw.POLYGON), handler = dojo.connect(geometryService, "onAreasAndLengthsComplete", doBuffer)) : 4 == e ? tb.activate(esri.toolbars.Draw.POINT) : 5 == e ? (handler && (handler = dojo.disconnect(handler)), tb.activate(esri.toolbars.Draw.POLYGON), handler = dojo.connect(geometryService, "onAreasAndLengthsComplete", doCount)) : 6 == e ? (handler && (handler = dojo.disconnect(handler)), tb.activate(esri.toolbars.Draw.POLYGON), handler = dojo.connect(geometryService, "onAreasAndLengthsComplete", doSuperCount)) : 7 == e && (handler && (handler = dojo.disconnect(handler)), tb.activate(esri.toolbars.Draw.POLYGON), handler = dojo.connect(geometryService, "onAreasAndLengthsComplete", doMost))
		})
	},
	Gis.prototype.docale = function(e, t) {
		require(["esri/units", "esri/geometry/Circle", "dojo/dom"],
		function(i, r, o) {
			function a(e) {
				function t(e) {
					for (var t, r = e.features,
					o = [], a = 0; a < r.length; a++) t = r[a],
					d.contains(t.geometry) && o.push(t.attributes.UUID);
					var n = new esri.tasks.Query;
					n.geometry = d,
					i.selectFeatures(n, esri.layers.FeatureLayer.SELECTION_NEW,
					function(e) {
						for (var t = e.length,
						i = 0; i < t; i++) {
							var r = new esri.InfoTemplate;
							r.setContent("rru-objectid:" + e[i].attributes.OBJECTID),
							e[i].setInfoTemplate(r)
						}
					})
				}
				var i = new esri.layers.FeatureLayer(_testDemo + "/0", {
					id: "demodata"
				}),
				r = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 12, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_NULL, new dojo.Color([247, 34, 101, .9]), 1), new dojo.Color([207, 34, 171, .5]));
				i.setSelectionSymbol(r);
				var o = (new esri.symbol.SimpleMarkerSymbol).setSize(0);
				i.setRenderer(new esri.renderer.SimpleRenderer(o)),
				_mapObject.addLayer(i);
				var a = new esri.tasks.Query;
				a.geometry = d.getExtent(),
				i.queryFeatures(a, t)
			}
			var n = new esri.geometry.Point(e, t, _mapObject.spatialReference),
			s = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 5, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 255, 255]), 4), new dojo.Color([250, 139, 46])),
			l = new esri.Graphic;
			l.setGeometry(n),
			l.setSymbol(s),
			mapSpatialLayer.add(l);
			var c = new esri.geometry.Point(e, t, _mapObject.spatialReference),
			d = new r({
				center: c,
				geodesic: !0,
				radius: 1,
				radiusUnit: i.KILOMETERS
			}),
			u = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, .25])),
			p = new esri.Graphic;
			p.setGeometry(d),
			p.setSymbol(u),
			mapSpatialLayer.add(p),
			a(d)
		})
	},
	Gis.prototype.isGraphic2Graphic = function(e, t, i, r) {
		function o(e) {
			var t = !0;
			switch (e[0].type) {
			case "point":
				"NaN" == e[0].x && (t = !1);
				break;
			case "polyline":
				0 == e[0].paths.length && (t = !1)
			}
			r(t)
		}
		function a(e) {
			console.log(e)
		}
		require(["esri/tasks/GeometryService", "dojo/dom"],
		function(r, n) {
			var s, l;
			if (1 == e) {
				var c = new esri.geometry.Point(t[0], t[1], _mapObject.spatialReference);
				s = [c],
				l = new esri.geometry.Polyline({
					paths: [i],
					spatialReference: _mapObject.spatialReference
				})
			} else if (2 == e) {
				var c = new esri.geometry.Point(t[0], t[1], _mapObject.spatialReference);
				s = [c],
				l = new esri.geometry.Polygon({
					rings: [i],
					spatialReference: _mapObject.spatialReference
				})
			} else if (3 == e) {
				var d = new esri.geometry.Polyline({
					paths: [t],
					spatialReference: _mapObject.spatialReference
				});
				s = [d],
				l = new esri.geometry.Polyline({
					paths: [i],
					spatialReference: _mapObject.spatialReference
				})
			} else if (4 == e) {
				var d = new esri.geometry.Polyline({
					paths: [t],
					spatialReference: _mapObject.spatialReference
				});
				s = [d],
				l = new esri.geometry.Polygon({
					rings: [i],
					spatialReference: _mapObject.spatialReference
				})
			} else if (5 == e) {
				var u = new esri.geometry.Polygon({
					rings: [t],
					spatialReference: _mapObject.spatialReference
				});
				s = [u],
				l = new esri.geometry.Polygon({
					rings: [i],
					spatialReference: _mapObject.spatialReference
				})
			}
			e > 0 && e < 6 && (geometryService || (geometryService = geometryService = new r(url_mapSvrPre + "arcgis/rest/services/Utilities/Geometry/GeometryServer")), geometryService.intersect(s, l, o, a))
		})
	},
	Gis.prototype.isLine2Line = function(e, t) {
		var i = {
			x: e[0][0],
			y: e[0][1]
		},
		r = {
			x: e[1][0],
			y: e[1][1]
		},
		o = {
			x: t[0][0],
			y: t[0][1]
		},
		a = {
			x: t[1][0],
			y: t[1][1]
		},
		n = segmentsIntr(i, r, o, a);
		return n && (n = !0),
		n
	};
	var xmlHttpRequest;
	Gis.prototype.coord2Point = function(e, t, i) {
		var r = _utils.convertPoint(e, t, 1);
		return r
	},
	Gis.prototype.satnav = function(e, t) {
		var i = {
			id: "0001",
			x: e.x,
			y: e.y,
			source: url_image + "fav_icon.png",
			html: "起点",
			canShowTip: !1,
			canDrag: !1
		},
		r = {
			id: "0002",
			x: t.x,
			y: t.y,
			source: url_image + "fav_icon.png",
			html: "终点",
			canShowTip: !1,
			canDrag: !1
		};
		this.addPointMarkers([i, r]);
		var o = (_utils.convertPoint(e.x, e.y, 1), _utils.convertPoint(t.x, t.y, 1), bd_api_direction + "transit?origin=" + e.y + "," + e.x + "&destination=" + t.y + "," + t.x + "&coord_type=wgs84&ak=nv89hhhaRpvdtk4HojFMM8NLUAhCMMVm&callback=Gis.callbackf"),
		a = {
			url: o,
			error: function(e) {}
		};
		dojo.io.script.get(a)
	},
	Gis.callbackf = function(e) {
		if (!e.result.routes[0]) return void alert("坐标超出范围");
		for (var t = e.result.routes[0].steps, i = 0; i < t.length; i++) for (var r = 0; r < t[i].length; r++) {
			for (var o = t[i][r].path + "", a = doCoord(o), n = a.split(";"), s = [], l = 0; l < n.length; l++) {
				var c = n[l].split(",")[0],
				d = n[l].split(",")[1];
				if (0 == l) {
					var u = new esri.geometry.Point(c, d, _mapObject.spatialReference),
					p = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 5, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 255, 255]), 4), new dojo.Color([250, 139, 46])),
					y = new esri.Graphic;
					y.setGeometry(u),
					y.setSymbol(p),
					mapSatnavLayer.add(y)
				}
				var m = [n[l].split(",")[0], n[l].split(",")[1]];
				s.push(m)
			}
			var g = new esri.geometry.Polyline({
				paths: [s],
				spatialReference: _mapObject.spatialReference
			}),
			h = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, "#0000FF", 3),
			_ = new esri.Graphic;
			_.setGeometry(g),
			_.setSymbol(h);
			var b = new esri.InfoTemplate;
			b.setContent("导航建议：" + t[i][r].instructions + ";耗时：" + parseInt(t[i][r].duration / 60) + "min"),
			_.setInfoTemplate(b),
			mapSatnavLayer.add(_)
		}
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
		var i = _mapObject.getLayer("clusters");
		i && _mapObject.removeLayer(i),
		_utils.removeLayer("demodata"),
		_utils.removeLayer("_CELL_FLOW_HEAT_poi_demo_"),
		_utils.removeLayer("061_demo_layer"),
		_utils.removeLayer("_gr_style_demo_"),
		_utils.removeLayer("_CELL_FLOW_HEAT_heatmap_demo_"),
		_utils.removeLayer("_CELL_FLOW_HEAT_distmap_demo_")
	},
	Gis.prototype.getBDPicturePoint = function(e) {
		function t(e, t, i, r, o, a) {
			mapSpatialLayer.clear(),
			mapSpatialLayer.add(a);
			var n = new Object({
				width: t,
				height: i,
				title: o,
				content: r,
				graphic: a
			});
			_utils.infoWindowOpen(n),
			_utils.hideLoadingUniversal("mapLoadingStatus")
		}
		var i = (e.x, e.y, _utils.convertPoint(e.x, e.y, 11)),
		r = "http://api.map.baidu.com/panorama/v2?ak=nv89hhhaRpvdtk4HojFMM8NLUAhCMMVm&width=350&height=250&fov=180&coordtype=wgs84ll&location=+" + e.x + "," + e.y,
		o = new esri.geometry.Point(i.x, i.y, _mapObject.spatialReference),
		a = new esri.symbol.PictureMarkerSymbol(url_image + "fav_icon.png", 16, 24),
		n = new esri.Graphic(o, a),
		s = new Image;
		s.src = r,
		s.CurPos = o,
		s.clickPoint = n,
		s.title = "全景图片",
		s.complete ? t(this.CurPos, 370, 270, this, this.title, this.clickPoint) : (s.onload = function() {
			t(this.CurPos, 370, 270, this, this.title, this.clickPoint)
		},
		s.onerror = function() {
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
	Gis.prototype.getInnerCircle = function(e, t, i) {
		AddMsCircleServer(e, t, i)
	},
	Gis.prototype.getPolymerization = function(e) {
		doPolymerization(e)
	},
	function(e) {
		function t(e) {
			var t = a,
			i = t.biDivideByRadixPower(e, this.k - 1),
			r = t.biMultiply(i, this.mu),
			o = t.biDivideByRadixPower(r, this.k + 1),
			n = t.biModuloByRadixPower(e, this.k + 1),
			s = t.biMultiply(o, this.modulus),
			l = t.biModuloByRadixPower(s, this.k + 1),
			c = t.biSubtract(n, l);
			c.isNeg && (c = t.biAdd(c, this.bkplus1));
			for (var d = t.biCompare(c, this.modulus) >= 0; d;) c = t.biSubtract(c, this.modulus),
			d = t.biCompare(c, this.modulus) >= 0;
			return c
		}
		function r(e, t) {
			var i = a.biMultiply(e, t);
			return this.modulo(i)
		}
		function o(e, t) {
			var i = new h;
			i.digits[0] = 1;
			for (var r = e,
			o = t;;) {
				if (0 != (1 & o.digits[0]) && (i = this.multiplyMod(i, r)), o = a.biShiftRight(o, 1), 0 == o.digits[0] && 0 == a.biHighIndex(o)) break;
				r = this.multiplyMod(r, r)
			}
			return i
		}
		if ("undefined" == typeof e.RSAUtils) var a = e.RSAUtils = {};
		var n, s, l, c, d = 16,
		u = d,
		p = 65536,
		y = p >>> 1,
		m = p * p,
		g = p - 1,
		h = e.BigInt = function(e) {
			"boolean" == typeof e && 1 == e ? this.digits = null: this.digits = s.slice(0),
			this.isNeg = !1
		};
		a.setMaxDigits = function(e) {
			n = e,
			s = new Array(n);
			for (var t = 0; t < s.length; t++) s[t] = 0;
			l = new h,
			c = new h,
			c.digits[0] = 1
		},
		a.setMaxDigits(20);
		var _ = 15;
		a.biFromNumber = function(e) {
			var t = new h;
			t.isNeg = e < 0,
			e = Math.abs(e);
			for (var i = 0; e > 0;) t.digits[i++] = e & g,
			e = Math.floor(e / p);
			return t
		};
		var b = a.biFromNumber(1e15);
		a.biFromDecimal = function(e) {
			for (var t, i = "-" == e.charAt(0), r = i ? 1 : 0; r < e.length && "0" == e.charAt(r);)++r;
			if (r == e.length) t = new h;
			else {
				var o = e.length - r,
				n = o % _;
				for (0 == n && (n = _), t = a.biFromNumber(Number(e.substr(r, n))), r += n; r < e.length;) t = a.biAdd(a.biMultiply(t, b), a.biFromNumber(Number(e.substr(r, _)))),
				r += _;
				t.isNeg = i
			}
			return t
		},
		a.biCopy = function(e) {
			var t = new h((!0));
			return t.digits = e.digits.slice(0),
			t.isNeg = e.isNeg,
			t
		},
		a.reverseStr = function(e) {
			for (var t = "",
			i = e.length - 1; i > -1; --i) t += e.charAt(i);
			return t
		};
		var v = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
		a.biToString = function(e, t) {
			var i = new h;
			i.digits[0] = t;
			for (var r = a.biDivideModulo(e, i), o = v[r[1].digits[0]]; 1 == a.biCompare(r[0], l);) r = a.biDivideModulo(r[0], i),
			digit = r[1].digits[0],
			o += v[r[1].digits[0]];
			return (e.isNeg ? "-": "") + a.reverseStr(o)
		},
		a.biToDecimal = function(e) {
			var t = new h;
			t.digits[0] = 10;
			for (var i = a.biDivideModulo(e, t), r = String(i[1].digits[0]); 1 == a.biCompare(i[0], l);) i = a.biDivideModulo(i[0], t),
			r += String(i[1].digits[0]);
			return (e.isNeg ? "-": "") + a.reverseStr(r)
		};
		var f = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
		a.digitToHex = function(e) {
			var t = 15,
			r = "";
			for (i = 0; i < 4; ++i) r += f[e & t],
			e >>>= 4;
			return a.reverseStr(r)
		},
		a.biToHex = function(e) {
			for (var t = "",
			i = (a.biHighIndex(e), a.biHighIndex(e)); i > -1; --i) t += a.digitToHex(e.digits[i]);
			return t
		},
		a.charToHex = function(e) {
			var t, i = 48,
			r = i + 9,
			o = 97,
			a = o + 25,
			n = 65,
			s = 90;
			return t = e >= i && e <= r ? e - i: e >= n && e <= s ? 10 + e - n: e >= o && e <= a ? 10 + e - o: 0
		},
		a.hexToDigit = function(e) {
			for (var t = 0,
			i = Math.min(e.length, 4), r = 0; r < i; ++r) t <<= 4,
			t |= a.charToHex(e.charCodeAt(r));
			return t
		},
		a.biFromHex = function(e) {
			for (var t = new h,
			i = e.length,
			r = i,
			o = 0; r > 0; r -= 4, ++o) t.digits[o] = a.hexToDigit(e.substr(Math.max(r - 4, 0), Math.min(r, 4)));
			return t
		},
		a.biFromString = function(e, t) {
			var i = "-" == e.charAt(0),
			r = i ? 1 : 0,
			o = new h,
			n = new h;
			n.digits[0] = 1;
			for (var s = e.length - 1; s >= r; s--) {
				var l = e.charCodeAt(s),
				c = a.charToHex(l),
				d = a.biMultiplyDigit(n, c);
				o = a.biAdd(o, d),
				n = a.biMultiplyDigit(n, t)
			}
			return o.isNeg = i,
			o
		},
		a.biDump = function(e) {
			return (e.isNeg ? "-": "") + e.digits.join(" ")
		},
		a.biAdd = function(e, t) {
			var i;
			if (e.isNeg != t.isNeg) t.isNeg = !t.isNeg,
			i = a.biSubtract(e, t),
			t.isNeg = !t.isNeg;
			else {
				i = new h;
				for (var r, o = 0,
				n = 0; n < e.digits.length; ++n) r = e.digits[n] + t.digits[n] + o,
				i.digits[n] = r % p,
				o = Number(r >= p);
				i.isNeg = e.isNeg
			}
			return i
		},
		a.biSubtract = function(e, t) {
			var i;
			if (e.isNeg != t.isNeg) t.isNeg = !t.isNeg,
			i = a.biAdd(e, t),
			t.isNeg = !t.isNeg;
			else {
				i = new h;
				var r, o;
				o = 0;
				for (var n = 0; n < e.digits.length; ++n) r = e.digits[n] - t.digits[n] + o,
				i.digits[n] = r % p,
				i.digits[n] < 0 && (i.digits[n] += p),
				o = 0 - Number(r < 0);
				if (o == -1) {
					o = 0;
					for (var n = 0; n < e.digits.length; ++n) r = 0 - i.digits[n] + o,
					i.digits[n] = r % p,
					i.digits[n] < 0 && (i.digits[n] += p),
					o = 0 - Number(r < 0);
					i.isNeg = !e.isNeg
				} else i.isNeg = e.isNeg
			}
			return i
		},
		a.biHighIndex = function(e) {
			for (var t = e.digits.length - 1; t > 0 && 0 == e.digits[t];)--t;
			return t
		},
		a.biNumBits = function(e) {
			var t, i = a.biHighIndex(e),
			r = e.digits[i],
			o = (i + 1) * u;
			for (t = o; t > o - u && 0 == (32768 & r); --t) r <<= 1;
			return t
		},
		a.biMultiply = function(e, t) {
			for (var i, r, o, n = new h,
			s = a.biHighIndex(e), l = a.biHighIndex(t), c = 0; c <= l; ++c) {
				for (i = 0, o = c, j = 0; j <= s; ++j, ++o) r = n.digits[o] + e.digits[j] * t.digits[c] + i,
				n.digits[o] = r & g,
				i = r >>> d;
				n.digits[c + s + 1] = i
			}
			return n.isNeg = e.isNeg != t.isNeg,
			n
		},
		a.biMultiplyDigit = function(e, t) {
			var i, r, o;
			result = new h,
			i = a.biHighIndex(e),
			r = 0;
			for (var n = 0; n <= i; ++n) o = result.digits[n] + e.digits[n] * t + r,
			result.digits[n] = o & g,
			r = o >>> d;
			return result.digits[1 + i] = r,
			result
		},
		a.arrayCopy = function(e, t, i, r, o) {
			for (var a = Math.min(t + o, e.length), n = t, s = r; n < a; ++n, ++s) i[s] = e[n]
		};
		var S = [0, 32768, 49152, 57344, 61440, 63488, 64512, 65024, 65280, 65408, 65472, 65504, 65520, 65528, 65532, 65534, 65535];
		a.biShiftLeft = function(e, t) {
			var i = Math.floor(t / u),
			r = new h;
			a.arrayCopy(e.digits, 0, r.digits, i, r.digits.length - i);
			for (var o = t % u,
			n = u - o,
			s = r.digits.length - 1,
			l = s - 1; s > 0; --s, --l) r.digits[s] = r.digits[s] << o & g | (r.digits[l] & S[o]) >>> n;
			return r.digits[0] = r.digits[s] << o & g,
			r.isNeg = e.isNeg,
			r
		};
		var L = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535];
		a.biShiftRight = function(e, t) {
			var i = Math.floor(t / u),
			r = new h;
			a.arrayCopy(e.digits, i, r.digits, 0, e.digits.length - i);
			for (var o = t % u,
			n = u - o,
			s = 0,
			l = s + 1; s < r.digits.length - 1; ++s, ++l) r.digits[s] = r.digits[s] >>> o | (r.digits[l] & L[o]) << n;
			return r.digits[r.digits.length - 1] >>>= o,
			r.isNeg = e.isNeg,
			r
		},
		a.biMultiplyByRadixPower = function(e, t) {
			var i = new h;
			return a.arrayCopy(e.digits, 0, i.digits, t, i.digits.length - t),
			i
		},
		a.biDivideByRadixPower = function(e, t) {
			var i = new h;
			return a.arrayCopy(e.digits, t, i.digits, 0, i.digits.length - t),
			i
		},
		a.biModuloByRadixPower = function(e, t) {
			var i = new h;
			return a.arrayCopy(e.digits, 0, i.digits, 0, t),
			i
		},
		a.biCompare = function(e, t) {
			if (e.isNeg != t.isNeg) return 1 - 2 * Number(e.isNeg);
			for (var i = e.digits.length - 1; i >= 0; --i) if (e.digits[i] != t.digits[i]) return e.isNeg ? 1 - 2 * Number(e.digits[i] > t.digits[i]) : 1 - 2 * Number(e.digits[i] < t.digits[i]);
			return 0
		},
		a.biDivideModulo = function(e, t) {
			var i, r, o = a.biNumBits(e),
			n = a.biNumBits(t),
			s = t.isNeg;
			if (o < n) return e.isNeg ? (i = a.biCopy(c), i.isNeg = !t.isNeg, e.isNeg = !1, t.isNeg = !1, r = biSubtract(t, e), e.isNeg = !0, t.isNeg = s) : (i = new h, r = a.biCopy(e)),
			[i, r];
			i = new h,
			r = e;
			for (var l = Math.ceil(n / u) - 1, d = 0; t.digits[l] < y;) t = a.biShiftLeft(t, 1),
			++d,
			++n,
			l = Math.ceil(n / u) - 1;
			r = a.biShiftLeft(r, d),
			o += d;
			for (var _ = Math.ceil(o / u) - 1, b = a.biMultiplyByRadixPower(t, _ - l); a.biCompare(r, b) != -1;)++i.digits[_ - l],
			r = a.biSubtract(r, b);
			for (var v = _; v > l; --v) {
				var f = v >= r.digits.length ? 0 : r.digits[v],
				S = v - 1 >= r.digits.length ? 0 : r.digits[v - 1],
				L = v - 2 >= r.digits.length ? 0 : r.digits[v - 2],
				w = l >= t.digits.length ? 0 : t.digits[l],
				x = l - 1 >= t.digits.length ? 0 : t.digits[l - 1];
				f == w ? i.digits[v - l - 1] = g: i.digits[v - l - 1] = Math.floor((f * p + S) / w);
				for (var j = i.digits[v - l - 1] * (w * p + x), O = f * m + (S * p + L); j > O;)--i.digits[v - l - 1],
				j = i.digits[v - l - 1] * (w * p | x),
				O = f * p * p + (S * p + L);
				b = a.biMultiplyByRadixPower(t, v - l - 1),
				r = a.biSubtract(r, a.biMultiplyDigit(b, i.digits[v - l - 1])),
				r.isNeg && (r = a.biAdd(r, b), --i.digits[v - l - 1])
			}
			return r = a.biShiftRight(r, d),
			i.isNeg = e.isNeg != s,
			e.isNeg && (i = s ? a.biAdd(i, c) : a.biSubtract(i, c), t = a.biShiftRight(t, d), r = a.biSubtract(t, r)),
			0 == r.digits[0] && 0 == a.biHighIndex(r) && (r.isNeg = !1),
			[i, r]
		},
		a.biDivide = function(e, t) {
			return a.biDivideModulo(e, t)[0]
		},
		a.biModulo = function(e, t) {
			return a.biDivideModulo(e, t)[1]
		},
		a.biMultiplyMod = function(e, t, i) {
			return a.biModulo(a.biMultiply(e, t), i)
		},
		a.biPow = function(e, t) {
			for (var i = c,
			r = e;;) {
				if (0 != (1 & t) && (i = a.biMultiply(i, r)), t >>= 1, 0 == t) break;
				r = a.biMultiply(r, r)
			}
			return i
		},
		a.biPowMod = function(e, t, i) {
			for (var r = c,
			o = e,
			n = t;;) {
				if (0 != (1 & n.digits[0]) && (r = a.biMultiplyMod(r, o, i)), n = a.biShiftRight(n, 1), 0 == n.digits[0] && 0 == a.biHighIndex(n)) break;
				o = a.biMultiplyMod(o, o, i)
			}
			return r
		},
		e.BarrettMu = function(e) {
			this.modulus = a.biCopy(e),
			this.k = a.biHighIndex(this.modulus) + 1;
			var i = new h;
			i.digits[2 * this.k] = 1,
			this.mu = a.biDivide(i, this.modulus),
			this.bkplus1 = new h,
			this.bkplus1.digits[this.k + 1] = 1,
			this.modulo = t,
			this.multiplyMod = r,
			this.powMod = o
		};
		var w = function(t, i, r) {
			var o = a;
			this.e = o.biFromHex(t),
			this.d = o.biFromHex(i),
			this.m = o.biFromHex(r),
			this.chunkSize = 2 * o.biHighIndex(this.m),
			this.radix = 16,
			this.barrett = new e.BarrettMu(this.m)
		};
		a.getKeyPair = function(e, t, i) {
			return new w(e, t, i)
		},
		"undefined" == typeof e.twoDigit && (e.twoDigit = function(e) {
			return (e < 10 ? "0": "") + String(e)
		}),
		a.encryptedString = function(e, t) {
			for (var i = [], r = t.length, o = 0; o < r;) i[o] = t.charCodeAt(o),
			o++;
			for (; i.length % e.chunkSize != 0;) i[o++] = 0;
			var n, s, l, c = i.length,
			d = "";
			for (o = 0; o < c; o += e.chunkSize) {
				for (l = new h, n = 0, s = o; s < o + e.chunkSize; ++n) l.digits[n] = i[s++],
				l.digits[n] += i[s++] << 8;
				var u = e.barrett.powMod(l, e.e),
				p = 16 == e.radix ? a.biToHex(u) : a.biToString(u, e.radix);
				d += p + " "
			}
			return d.substring(0, d.length - 1)
		},
		a.decryptedString = function(e, t) {
			var i, r, o, n = t.split(" "),
			s = "";
			for (i = 0; i < n.length; ++i) {
				var l;
				for (l = 16 == e.radix ? a.biFromHex(n[i]) : a.biFromString(n[i], e.radix), o = e.barrett.powMod(l, e.d), r = 0; r <= a.biHighIndex(o); ++r) s += String.fromCharCode(255 & o.digits[r], o.digits[r] >> 8)
			}
			return 0 == s.charCodeAt(s.length - 1) && (s = s.substring(0, s.length - 1)),
			s
		},
		a.setMaxDigits(130)
	} (UtilsForGis.prototype);
	var _cityBox_String = "<div class='_gis-citybox' id='_gis_Citybox'>\n<div class='_gis-city-title'>\n<a id='_gisCurrentCityBtn'>杭州市</a><span id='_gisDropDownBtn'>▼</span>\n</div>\n<div class='_gis-city-panel' style='display:none'>\n<header>\n<span>当前：<label id='_gis_cityCurrent'>杭州市</label></span>\n<span id='_gis_cityPannelClose'>关闭</span>\n</header>\n<hr/>\n<ul class='_gis-city-list'>\n<li class='_gis-city-item'>杭州市</li>\n<li class='_gis-city-item'>湖州市</li>\n<li class='_gis-city-item'>嘉兴市</li>\n<li class='_gis-city-item'>金华市</li>\n<li class='_gis-city-item'>丽水市</li>\n<li class='_gis-city-item'>宁波市</li>\n<li class='_gis-city-item'>衢州市</li>\n<li class='_gis-city-item'>绍兴市</li>\n<li class='_gis-city-item'>台州市</li>\n<li class='_gis-city-item'>温州市</li>\n<li class='_gis-city-item'>舟山市</li>\n</ul>\n<hr/>\n<div class='_gis-city-dist'>\n<ul class='_gis-to-dist-list'>\n<li class='_gis-to-dist-item'>H</li>\n<li class='_gis-to-dist-item' sTop=130>J</li>\n<li class='_gis-to-dist-item' sTop=260>L</li>\n<li class='_gis-to-dist-item' sTop=325>N</li>\n<li class='_gis-to-dist-item' sTop=390>Q</li>\n<li class='_gis-to-dist-item' sTop=435>S</li>\n<li class='_gis-to-dist-item' sTop=475>T</li>\n<li class='_gis-to-dist-item'>W</li>\n<li class='_gis-to-dist-item'>Z</li>\n</ul>\n<dl id='_gis-city-dist-dl'>\n<dt>杭州市：</dt>\n<dd>\n<li class='_gis-city-item'>上城区</li>\n<li class='_gis-city-item'>下城区</li>\n<li class='_gis-city-item'>江干区</li>\n<li class='_gis-city-item'>拱墅区</li>\n<li class='_gis-city-item'>西湖区</li>\n<li class='_gis-city-item'>滨江区</li>\n<li class='_gis-city-item'>萧山区</li>\n<li class='_gis-city-item'>余杭区</li>\n<li class='_gis-city-item'>桐庐县</li>\n<li class='_gis-city-item'>淳安县</li>\n<li class='_gis-city-item'>建德市</li>\n<li class='_gis-city-item'>富阳市</li>\n<li class='_gis-city-item'>临安市</li>\n</dd>\n<dt>湖州市：</dt>\n<dd>\n<li class='_gis-city-item'>吴兴区</li>\n<li class='_gis-city-item'>南浔区</li>\n<li class='_gis-city-item'>德清县</li>\n<li class='_gis-city-item'>长兴县</li>\n<li class='_gis-city-item'>安吉县</li>\n</dd>\n<dt>嘉兴市：</dt>\n<dd>\n<li class='_gis-city-item'>南湖区</li>\n<li class='_gis-city-item'>秀洲区</li>\n<li class='_gis-city-item'>嘉善县</li>\n<li class='_gis-city-item'>海盐县</li>\n<li class='_gis-city-item'>海宁市</li>\n<li class='_gis-city-item'>平湖市</li>\n<li class='_gis-city-item'>桐乡市</li>\n</dd>\n<dt>金华市：</dt>\n<dd>\n<li class='_gis-city-item'>婺城区</li>\n<li class='_gis-city-item'>金东区</li>\n<li class='_gis-city-item'>武义县</li>\n<li class='_gis-city-item'>浦江县</li>\n<li class='_gis-city-item'>磐安县</li>\n<li class='_gis-city-item'>兰溪市</li>\n<li class='_gis-city-item'>义乌市</li>\n<li class='_gis-city-item'>东阳市</li>\n<li class='_gis-city-item'>永康市</li>\n</dd>\n<dt>丽水市：</dt>\n<dd>\n<li class='_gis-city-item'>莲都区</li>\n<li class='_gis-city-item'>青田县</li>\n<li class='_gis-city-item'>缙云县</li>\n<li class='_gis-city-item'>遂昌县</li>\n<li class='_gis-city-item'>松阳县</li>\n<li class='_gis-city-item'>云和县</li>\n<li class='_gis-city-item'>庆元县</li>\n<li class='_gis-city-item'>景宁县</li>\n<li class='_gis-city-item'>龙泉市</li>\n</dd>\n<dt>宁波市：</dt>\n<dd>\n<li class='_gis-city-item'>海曙区</li>\n<li class='_gis-city-item'>江东区</li>\n<li class='_gis-city-item'>江北区</li>\n<li class='_gis-city-item'>北仑区</li>\n<li class='_gis-city-item'>镇海区</li>\n<li class='_gis-city-item'>鄞州区</li>\n<li class='_gis-city-item'>象山县</li>\n<li class='_gis-city-item'>宁海县</li>\n<li class='_gis-city-item'>余姚市</li>\n<li class='_gis-city-item'>慈溪市</li>\n<li class='_gis-city-item'>奉化市</li>\n</dd>\n<dt>衢州市：</dt>\n<dd>\n<li class='_gis-city-item'>柯城区</li>\n<li class='_gis-city-item'>衢江区</li>\n<li class='_gis-city-item'>常山县</li>\n<li class='_gis-city-item'>开化县</li>\n<li class='_gis-city-item'>龙游县</li>\n<li class='_gis-city-item'>江山市</li>\n</dd>\n<dt>绍兴市：</dt>\n<dd>\n<li class='_gis-city-item'>越城区</li>\n<li class='_gis-city-item'>柯桥区</li>\n<li class='_gis-city-item'>新昌县</li>\n<li class='_gis-city-item'>诸暨市</li>\n<li class='_gis-city-item'>上虞市</li>\n<li class='_gis-city-item'>嵊州市</li>\n</dd>\n<dt>台州市：</dt>\n<dd>\n<li class='_gis-city-item'>椒江区</li>\n<li class='_gis-city-item'>黄岩区</li>\n<li class='_gis-city-item'>路桥区</li>\n<li class='_gis-city-item'>玉环县</li>\n<li class='_gis-city-item'>三门县</li>\n<li class='_gis-city-item'>天台县</li>\n<li class='_gis-city-item'>仙居县</li>\n<li class='_gis-city-item'>温岭市</li>\n<li class='_gis-city-item'>临海市</li>\n</dd>\n<dt>温州市：</dt>\n<dd>\n<li class='_gis-city-item'>鹿城区</li>\n<li class='_gis-city-item'>龙湾区</li>\n<li class='_gis-city-item'>瓯海区</li>\n<li class='_gis-city-item'>洞头区</li>\n<li class='_gis-city-item'>永嘉县</li>\n<li class='_gis-city-item'>平阳县</li>\n<li class='_gis-city-item'>苍南县</li>\n<li class='_gis-city-item'>文成县</li>\n<li class='_gis-city-item'>泰顺县</li>\n<li class='_gis-city-item'>瑞安市</li>\n<li class='_gis-city-item'>乐清市</li>\n</dd>\n<dt>舟山市：</dt>\n<dd>\n<li class='_gis-city-item'>定海区</li>\n<li class='_gis-city-item'>普陀区</li>\n<li class='_gis-city-item'>岱山县</li>\n<li class='_gis-city-item'>嵊泗县</li>\n</dd>\n</dl>\n</div>\n</div>\n</div>",
	__Gis = $wd.Gis;
	Gis.noConflict = function() {
		return $wd.Gis === Gis && ($wd.Gis = __Gis),
		Gis
	},
	$wd.Gis && $wd.Gis.destroy(),
	$wd.Gis = Gis
});