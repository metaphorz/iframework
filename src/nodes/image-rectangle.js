// extends src/nodes/image.js which extends src/node-box-native-view.js

$(function(){

  Iframework.NativeNodes["image-rectangle"] = Iframework.NativeNodes["image"].extend({

    info: {
      title: "image-rectangle",
      description: "draw a rectangle"
    },
    initializeModule: function(){
      
    },
    inputbackground: function (image) {
      this._background = image;
      this.process();
    },
    inputstroke: function (color) {
      this._stroke = color;
      this.process();
    },
    process: function(){
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      if (this._background) {
        if (this.canvas.width !== this._background.width || this.canvas.height !== this._background.height) {
          this.canvas.width = this._background.width;
          this.canvas.height = this._background.height;
        }
        this.context.drawImage(this._background, 0, 0);
      }
      // Rectangle
      if (this._fill && this._fill!=="") {
        this.context.fillRect(this._x, this._y, this._w, this._h);  
      }
      // Stroke
      if (this._stroke && this._stroke!=="" && this._strokeWidth && this._strokeWidth>0) {
        this.context.strokeRect(this._x, this._y, this._w, this._h);  
      }
      this.inputsend();
    },
    renderAnimationFrame: function () {
      // this.process();
    },
    inputsend: function () {
      this.send("image", this.canvas);
    },
    inputs: {
      background: {
        type: "image",
        description: "first image layer"
      },
      x: {
        type: "float",
        description: "x of top-left corner",
        "default": 75
      },
      y: {
        type: "float",
        description: "y of top-left corner",
        "default": 75
      },
      w: {
        type: "float",
        description: "rectangle width",
        "default": 350
      },
      h: {
        type: "float",
        description: "rectangle height",
        "default": 350
      },
      fill: {
        type: "string",
        description: "fill color",
        "default": "red"
      },
      stroke: {
        type: "string",
        description: "stroke color",
        "default": "black"
      },
      strokewidth: {
        type: "float",
        description: "stroke width",
        "default": 1
      },
      clear: {
        type: "bang",
        description: "clear the canvas"
      },
      send: {
        type: "bang",
        description: "send the combined canvas"
      }
    },
    outputs: {
      image: {
        type: "image"
      },
      bang: {
        type: "bang"
      }
    }

  });


});
