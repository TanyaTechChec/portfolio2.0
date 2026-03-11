document.addEventListener('DOMContentLoaded', function () {

  // Фон пузырей
  (function() {
    let width, height, canvas, ctx, circles, animateHeader = true;

    function initHeader() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas = document.getElementById('bubbles');
      if(!canvas) return;
      canvas.width = width; canvas.height = height;
      ctx = canvas.getContext('2d');
      circles = [];
      for(let i=0;i<width*0.9;i++){ circles.push(new Circle()); }
      animate();
    }

    function addListeners() {
      window.addEventListener('scroll',()=>{ animateHeader = document.body.scrollTop <= height; });
      window.addEventListener('resize',()=>{ width = window.innerWidth; height = window.innerHeight; canvas.width = width; canvas.height = height; });
    }

    function animate(){
      if(animateHeader){ ctx.clearRect(0,0,width,height); for(let c of circles){ c.draw(); } }
      requestAnimationFrame(animate);
    }

    function Circle(){
      let _this = this;
      function init(){ _this.pos={x:Math.random()*width, y:height+Math.random()*100}; _this.alpha=0.1+Math.random()*0.9; _this.scale=0.1+Math.random()*0.9; _this.velocity=Math.random(); }
      init();
      this.draw = function(){
        if(_this.alpha<=0) init();
        _this.pos.y -= _this.velocity;
        _this.alpha -= 0.0005;
        ctx.beginPath();
        ctx.arc(_this.pos.x,_this.pos.y,_this.scale*10,0,Math.PI*2);
        ctx.fillStyle = 'rgba(157,188,225,'+_this.alpha+')';
        ctx.fill();
      }
    }

    initHeader();
    addListeners();
  })();

  // Слайдер
  const slides = document.querySelectorAll('.slides img');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');
  const container = document.querySelector('.slides-container');
  let index = 0;

  function showSlide(){
    slides.forEach((img,i)=>{
      img.classList.remove('active');
      if(i===index) img.classList.add('active');
    });
    // подгоняем высоту контейнера под активную картинку
    const activeImg = slides[index];
    container.style.height = activeImg.naturalHeight > 400 ? '400px' : activeImg.naturalHeight + 'px';
  }

  nextBtn.addEventListener('click',()=>{
    index++; if(index>=slides.length) index=0; showSlide();
  });

  prevBtn.addEventListener('click',()=>{
    index--; if(index<0) index=slides.length-1; showSlide();
  });

  window.addEventListener('resize', showSlide);
  showSlide();

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.close');

  slides.forEach(img=>{
    img.addEventListener('click', ()=>{
      lightbox.style.display='flex';
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    });
  });

  closeBtn.addEventListener('click', ()=>{ lightbox.style.display='none'; });
  lightbox.addEventListener('click', e=>{ if(e.target===lightbox) lightbox.style.display='none'; });

});
