// ざっくり水硬度計算機のイラスト (自動生成: design/illustrations/water-hardness/build.mjs)
// Illustrator で「ファイル > スクリプト > その他のスクリプト」からこのファイルを実行する。
// 新規ドキュメントにアートボード bottle / pitcher / bean を作り、線パスで描く。
// 調整後は「書き出し > スクリーン用に書き出し」(SVG) で
// site-src/public/assets/techreate/whx/<アートボード名>.svg を上書きする。
// ※ アートボードのサイズは変えないこと(サイトの入力欄の位置がこのサイズ基準)
#target illustrator

(function () {
  var ARTS = [{"name":"bottle","width":212,"height":280,"shapes":[{"name":"body","fill":null,"fillOpacity":1,"stroke":"ink","strokeWidth":2.4,"subpaths":[{"closed":false,"pts":[{"a":[43,33],"l":[43,33],"r":[43,33],"s":false},{"a":[43,44],"l":[43,44],"r":[43,70],"s":false},{"a":[12,112],"l":[12,78],"r":[12,112],"s":false},{"a":[12,258],"l":[12,258],"r":[12,270],"s":false},{"a":[32,276],"l":[20,276],"r":[32,276],"s":false},{"a":[88,276],"l":[88,276],"r":[100,276],"s":false},{"a":[108,258],"l":[108,270],"r":[108,258],"s":false},{"a":[108,112],"l":[108,112],"r":[108,78],"s":false},{"a":[77,44],"l":[77,70],"r":[77,44],"s":false},{"a":[77,33],"l":[77,33],"r":[77,33],"s":false}]}]},{"name":"cap","fill":null,"fillOpacity":1,"stroke":"ink","strokeWidth":2.4,"subpaths":[{"closed":false,"pts":[{"a":[40,26],"l":[40,26],"r":[40,26],"s":false},{"a":[40,9],"l":[40,9],"r":[40,6.2],"s":false},{"a":[45,4],"l":[42.2,4],"r":[45,4],"s":false},{"a":[75,4],"l":[75,4],"r":[77.8,4],"s":false},{"a":[80,9],"l":[80,6.2],"r":[80,9],"s":false},{"a":[80,26],"l":[80,26],"r":[80,26],"s":false}]}]},{"name":"cap-line","fill":null,"fillOpacity":1,"stroke":"ink","strokeWidth":1.6,"subpaths":[{"closed":false,"pts":[{"a":[40,12],"l":[40,12],"r":[40,12],"s":false},{"a":[80,12],"l":[80,12],"r":[80,12],"s":false}]}]},{"name":"ring","fill":"accent","fillOpacity":1,"stroke":"ink","strokeWidth":2.4,"subpaths":[{"closed":true,"pts":[{"a":[38,26],"l":[36.9,26],"r":[38,26],"s":false},{"a":[82,26],"l":[82,26],"r":[83.1,26],"s":false},{"a":[84,28],"l":[84,26.9],"r":[84,28],"s":false},{"a":[84,31],"l":[84,31],"r":[84,32.1],"s":false},{"a":[82,33],"l":[83.1,33],"r":[82,33],"s":false},{"a":[38,33],"l":[38,33],"r":[36.9,33],"s":false},{"a":[36,31],"l":[36,32.1],"r":[36,31],"s":false},{"a":[36,28],"l":[36,28],"r":[36,26.9],"s":false}]}]},{"name":"string-loop","fill":null,"fillOpacity":1,"stroke":"ink","strokeWidth":1.6,"subpaths":[{"closed":false,"pts":[{"a":[43,37.5],"l":[43,37.5],"r":[47,41.5],"s":false},{"a":[77,37.5],"l":[73,41.5],"r":[77,37.5],"s":false}]}]},{"name":"tag","fill":"paper","fillOpacity":1,"stroke":"ink","strokeWidth":2.4,"subpaths":[{"closed":true,"pts":[{"a":[99.89,102.09],"l":[99.89,102.09],"r":[99.89,102.09],"s":false},{"a":[195.36,112.13],"l":[195.36,112.13],"r":[199.74,112.59],"s":false},{"a":[202.48,120.92],"l":[202.94,116.54],"r":[202.48,120.92],"s":false},{"a":[192.03,220.37],"l":[192.03,220.37],"r":[191.57,224.75],"s":false},{"a":[183.24,227.49],"l":[187.62,227.95],"r":[183.24,227.49],"s":false},{"a":[75.83,216.2],"l":[75.83,216.2],"r":[71.45,215.74],"s":false},{"a":[68.71,207.41],"l":[68.25,211.78],"r":[68.71,207.41],"s":false},{"a":[77.91,119.89],"l":[77.91,119.89],"r":[77.91,119.89],"s":false}]}]},{"name":"tag-rule","fill":null,"fillOpacity":1,"stroke":"ink","strokeWidth":1.6,"subpaths":[{"closed":false,"pts":[{"a":[93.1,185.84],"l":[93.1,185.84],"r":[93.1,185.84],"s":false},{"a":[174.65,194.41],"l":[174.65,194.41],"r":[174.65,194.41],"s":false}]}]},{"name":"grommet","fill":"accent","fillOpacity":1,"stroke":"ink","strokeWidth":1.6,"subpaths":[{"closed":true,"pts":[{"a":[106.08,124.18],"l":[106.08,120.59],"r":[106.08,127.77],"s":true},{"a":[99.58,130.68],"l":[103.17,130.68],"r":[95.99,130.68],"s":true},{"a":[93.08,124.18],"l":[93.08,127.77],"r":[93.08,120.59],"s":true},{"a":[99.58,117.68],"l":[95.99,117.68],"r":[103.17,117.68],"s":true}]}]},{"name":"grommet-hole","fill":"paper","fillOpacity":1,"stroke":"ink","strokeWidth":1.6,"subpaths":[{"closed":true,"pts":[{"a":[102.38,124.18],"l":[102.38,122.63],"r":[102.38,125.73],"s":true},{"a":[99.58,126.98],"l":[101.13,126.98],"r":[98.03,126.98],"s":true},{"a":[96.78,124.18],"l":[96.78,125.73],"r":[96.78,122.63],"s":true},{"a":[99.58,121.38],"l":[98.03,121.38],"r":[101.13,121.38],"s":true}]}]},{"name":"string","fill":null,"fillOpacity":1,"stroke":"ink","strokeWidth":1.6,"subpaths":[{"closed":false,"pts":[{"a":[77,39],"l":[77,39],"r":[90,46],"s":false},{"a":[99.58,124.18],"l":[101,84],"r":[99.58,124.18],"s":false}]}]}]},{"name":"pitcher","width":260,"height":186,"shapes":[{"name":"water","fill":"accent","fillOpacity":0.55,"stroke":null,"strokeWidth":0,"subpaths":[{"closed":true,"pts":[{"a":[26,108],"l":[26,108],"r":[26,108],"s":false},{"a":[16,150],"l":[16,150],"r":[11.7,168],"s":false},{"a":[40,178],"l":[22,178],"r":[40,178],"s":false},{"a":[200,178],"l":[200,178],"r":[218,178],"s":false},{"a":[224,150],"l":[228.3,168],"r":[224,150],"s":false},{"a":[214,108],"l":[214,108],"r":[214,108],"s":false}]}]},{"name":"water-surface","fill":"paper","fillOpacity":0.45,"stroke":null,"strokeWidth":0,"subpaths":[{"closed":true,"pts":[{"a":[214,108],"l":[214,104.41],"r":[214,111.59],"s":true},{"a":[120,114.5],"l":[171.91,114.5],"r":[68.09,114.5],"s":true},{"a":[26,108],"l":[26,111.59],"r":[26,104.41],"s":true},{"a":[120,101.5],"l":[68.09,101.5],"r":[171.91,101.5],"s":true}]}]},{"name":"body","fill":null,"fillOpacity":1,"stroke":"ink","strokeWidth":2.4,"subpaths":[{"closed":true,"pts":[{"a":[20,6],"l":[26,12],"r":[30,8],"s":false},{"a":[46,10],"l":[38,10],"r":[46,10],"s":false},{"a":[196,10],"l":[196,10],"r":[200.4,10],"s":false},{"a":[204,17],"l":[204,13.1],"r":[204,20.9],"s":true},{"a":[196,24],"l":[200.4,24],"r":[196,24],"s":false},{"a":[194,24],"l":[194,24],"r":[194,24],"s":false},{"a":[224,150],"l":[224,150],"r":[228.3,168],"s":false},{"a":[200,178],"l":[218,178],"r":[200,178],"s":false},{"a":[40,178],"l":[40,178],"r":[22,178],"s":false},{"a":[16,150],"l":[11.7,168],"r":[16,150],"s":false},{"a":[46,24],"l":[46,24],"r":[36,20],"s":false}]}]},{"name":"rim-line","fill":null,"fillOpacity":1,"stroke":"ink","strokeWidth":2.4,"subpaths":[{"closed":false,"pts":[{"a":[46,24],"l":[46,24],"r":[46,24],"s":false},{"a":[194,24],"l":[194,24],"r":[194,24],"s":false}]}]},{"name":"handle-outer","fill":null,"fillOpacity":1,"stroke":"ink","strokeWidth":2.4,"subpaths":[{"closed":false,"pts":[{"a":[196.9,36],"l":[196.9,36],"r":[196.9,36],"s":false},{"a":[210,36],"l":[210,36],"r":[240,36],"s":false},{"a":[252,62],"l":[252,42],"r":[252,62],"s":false},{"a":[250,120],"l":[250,120],"r":[249.4,136],"s":false},{"a":[222.6,144],"l":[240,143],"r":[222.6,144],"s":false}]}]},{"name":"handle-inner","fill":null,"fillOpacity":1,"stroke":"ink","strokeWidth":2.4,"subpaths":[{"closed":false,"pts":[{"a":[200.2,50],"l":[200.2,50],"r":[200.2,50],"s":false},{"a":[212,50],"l":[212,50],"r":[232,50],"s":false},{"a":[238,66],"l":[238,56],"r":[238,66],"s":false},{"a":[236.6,116],"l":[236.6,116],"r":[236.3,126],"s":false},{"a":[219.5,131],"l":[230,131],"r":[219.5,131],"s":false}]}]}]},{"name":"bean","width":40,"height":48,"shapes":[{"name":"outline","fill":null,"fillOpacity":1,"stroke":"ink","strokeWidth":2,"subpaths":[{"closed":true,"pts":[{"a":[31.13,28.5],"l":[34.85,19.28],"r":[27.4,37.71],"s":true},{"a":[13.26,40.69],"l":[19.4,43.17],"r":[7.11,38.21],"s":true},{"a":[8.87,19.5],"l":[5.15,28.72],"r":[12.6,10.29],"s":true},{"a":[26.74,7.31],"l":[20.6,4.83],"r":[32.89,9.79],"s":true}]}]},{"name":"center-line","fill":null,"fillOpacity":1,"stroke":"ink","strokeWidth":2,"subpaths":[{"closed":false,"pts":[{"a":[26.37,8.24],"l":[26.37,8.24],"r":[17.43,14.33],"s":false},{"a":[13.63,39.76],"l":[22.57,33.67],"r":[13.63,39.76],"s":false}]}]}]}];
  var COLORS = {"ink":[7,7,7],"paper":[255,255,255],"accent":[255,240,0]};
  var GAP = 40;

  function rgb(key) {
    var c = new RGBColor();
    c.red = COLORS[key][0];
    c.green = COLORS[key][1];
    c.blue = COLORS[key][2];
    return c;
  }

  app.coordinateSystem = CoordinateSystem.DOCUMENTCOORDINATESYSTEM;
  var doc = app.documents.add(DocumentColorSpace.RGB, ARTS[0].width, ARTS[0].height);

  var offsetX = 0;
  for (var i = 0; i < ARTS.length; i++) {
    var art = ARTS[i];
    var left = offsetX;
    var top = 0;
    var rect = [left, top, left + art.width, top - art.height];
    var board = i === 0 ? doc.artboards[0] : doc.artboards.add(rect);
    board.artboardRect = rect;
    board.name = art.name;

    var layer = i === 0 ? doc.layers[0] : doc.layers.add();
    layer.name = art.name;

    // SVG と同じ重なり順にするため、後の図形を手前に積む
    for (var j = 0; j < art.shapes.length; j++) {
      var shape = art.shapes[j];
      var target = layer;
      if (shape.subpaths.length > 1) {
        target = layer.compoundPathItems.add();
      }
      for (var k = 0; k < shape.subpaths.length; k++) {
        var sp = shape.subpaths[k];
        var path = target.pathItems.add();
        for (var m = 0; m < sp.pts.length; m++) {
          var p = sp.pts[m];
          var pp = path.pathPoints.add();
          pp.anchor = [left + p.a[0], top - p.a[1]];
          pp.leftDirection = [left + p.l[0], top - p.l[1]];
          pp.rightDirection = [left + p.r[0], top - p.r[1]];
          pp.pointType = p.s ? PointType.SMOOTH : PointType.CORNER;
        }
        path.closed = sp.closed;
        if (shape.fill) {
          path.filled = true;
          path.fillColor = rgb(shape.fill);
        } else {
          path.filled = false;
        }
        if (shape.stroke) {
          path.stroked = true;
          path.strokeColor = rgb(shape.stroke);
          path.strokeWidth = shape.strokeWidth;
          path.strokeCap = StrokeCap.ROUNDENDCAP;
          path.strokeJoin = StrokeJoin.ROUNDENDJOIN;
        } else {
          path.stroked = false;
        }
        if (shape.fillOpacity < 1) {
          path.opacity = shape.fillOpacity * 100;
        }
        path.name = shape.name;
      }
      if (target !== layer) {
        target.name = shape.name;
      }
    }
    offsetX += art.width + GAP;
  }

  doc.artboards.setActiveArtboardIndex(0);
  app.executeMenuCommand('fitall');
})();
