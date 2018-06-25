(function () {
  let max_particles = 100;
  let particles = [];
  let frequency = 100;
  let init_num = max_particles;
  let max_time = frequency * max_particles;
  let time_to_recreate = false;
  let text_line=24;
  // Enable repopolate
  setTimeout(function () {
    time_to_recreate = true;
  }.bind(this), max_time)

  // Popolate particles
  popolate(max_particles);

  let canvas = document.getElementById('banner2');
  canvas.width = screen.availWidth;
  canvas.height = 600;
  //$("body").append(canvas);
  let ctx = canvas.getContext('2d');

  class Particle {
    constructor(ctx, options) {
      console.log(canvas.height)
      let colors = ["#00b2f3", "#3c6a9d", "#ab4d4f", "#8d0730", "#6f0032"]
      let array = ["578", "678", "499", "322", "667", '628', '417', '325', '400', '390', '理科状元', '文科状元', '语文', '数学', '英语', '物理', '生物', '化学', '历史', '地理', '政治', '北京大学', '清华大学', '湖南大学', '武汉大学', '中南大学', '计算机', '园林设计', '土木工程', '金融专业']
      let types = ["full", "fill", "empty"]
      this.random = Math.random()
      this.ctx = ctx;
      this.progress = 0;
      
      this.w = canvas.width
      this.h = canvas.height
      this.x = (canvas.width / 2) + (Math.random() * 200- Math.random() * 200)
      this.y = (canvas.height / 2) + (Math.random() * 200 - Math.random() * 200)
      this.radius = 4 + (15 * this.random)
      this.type = types[this.randomIntFromInterval(0, types.length - 1)];
      this.color = colors[this.randomIntFromInterval(0, colors.length - 1)];
      this.text = array[this.randomIntFromInterval(0, array.length - 1)];
      this.a = 0
      this.s = (this.radius + (Math.random() * 1)) / 10;
    }

    getCoordinates () {
      return {
        x: this.x,
        y: this.y
      }
    }

    randomIntFromInterval (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    render () {
      // Create arc
      let lineWidth = 0.2 + (2.8 * this.random);
      let color = this.color;
      switch (this.type) {
        case "full":
          this.createArcFill(this.radius, color)
          this.createArcEmpty(this.radius + lineWidth, lineWidth / 2, color)
          this.createText(this.radius)
          break;
        case "fill":
          this.createArcFill(this.radius, color)
          this.createText(this.radius)
          break;
        case "empty":
          this.createArcEmpty(this.radius, lineWidth, color)
          this.createText(this.radius)
          break;
      }
    }
    createText (radius) {
      this.ctx.beginPath();
      ctx.font = "14px 微软雅黑";
      ctx.fillStyle = '#aaa';
      ctx.fillText(this.text, this.x-this.text.length*7, this.y -radius-5); 
      this.ctx.closePath();
    }
    createArcFill (radius, color) {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = color;
      this.ctx.fill();
      //画线
      // this.ctx.lineTo(1000, 200);
      // this.ctx.lineWidth = 1;
      // this.ctx.strokeStyle = "#fff";
      // this.ctx.stroke();
      this.ctx.closePath();

    }

    createArcEmpty (radius, lineWidth, color) {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
      this.ctx.lineWidth = lineWidth;
      this.ctx.strokeStyle = color;
      this.ctx.stroke();
      this.ctx.closePath();
    }

    move () {

      this.x += Math.cos(this.a) * this.s;
      this.y += Math.sin(this.a) * this.s;
      this.a += Math.random() * 0.4 - 0.2;

      if (this.x < 0 || this.x > this.w - this.radius) {
        return false
      }

      if (this.y < 0 || this.y > this.h - this.radius) {
        return false
      }
      this.render()
      return true
    }

    calculateDistance (v1, v2) {
      let x = Math.abs(v1.x - v2.x);
      let y = Math.abs(v1.y - v2.y);
      return Math.sqrt((x * x) + (y * y));
    }
  }

  /*
   * Function to clear layer ctx
   * @num:number number of particles
   */
  function popolate (num) {
    for (let i = 0; i < num; i++) {
      setTimeout(
        function (x) {
          return function () {
            // Add particle
            particles.push(new Particle(ctx))
          };
        }(i)
        , frequency * i);
    }
    return particles.length
  }

  function clear () {
     //ctx.globalAlpha=0.4;
    ctx.fillStyle = '#0f2249';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
   // ctx.globalAlpha=1;
  }

  function connection () {
    let old_element = null
    $.each(particles, function (i, element) {
      if (i > 0) {
        let box1 = old_element.getCoordinates()
        let box2 = element.getCoordinates()
        ctx.beginPath();
        ctx.moveTo(box1.x, box1.y);
        ctx.lineTo(box2.x, box2.y);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#aaa";
        ctx.stroke();
        /* //创建指示线
        ctx.moveTo(box1.x, box1.y);
        ctx.lineTo(box1.x, box1.y - 20);
        ctx.strokeStyle = "#555";
        ctx.lineWidth = 1;
        ctx.stroke();
        //创建描述
        ctx.font = "14px 微软雅黑";
        ctx.fillStyle = '#555';
        ctx.fillText("578", box1.x - 10, box1.y - 20); */

        ctx.closePath();
      }

      old_element = element
    })
  }

  /*
   * Function to update particles in ctx
   */
  function update () {
    clear();
    connection()
    particles = particles.filter(function (p) { return p.move() })
    // Recreate particles
    if (time_to_recreate) {
      if (particles.length < init_num) { popolate(1); }
    }
    requestAnimationFrame(update.bind(this))
  }

  update()

})()
