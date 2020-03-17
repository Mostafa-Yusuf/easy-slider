/*  W3 slider */
let H2O = {};

H2O.slideTime = 10000;

H2O.slider = function(options){
console.log(options);
  this.slideIndex = 0;
  this.autoTimeout;
  this.sliderId = options.sliderID;
  this.slideClass = options.slideClass;
  this.slides = $(options.sliderID).find(options.slideClass);
  if(options.dotClass){
    this.dots = $(options.sliderID).find(options.dotClass);
  }

  this.slidesNum = this.slides.length;
  let self = this;

  this.currentSlide = function(n) {

    //	$( ".mySlides" ).stop();
    clearTimeout(self.autoTimeout); //stop the slider
    self.slideIndex  = n ;
    self.showSlide();
    var time = $(self.sliderId).find(self.slideClass).eq(n).attr('data-time');
    if(!time){
       time = self.slideTime;
    }
    console.log(time);
    console.log(self.autoSlide);
    self.slideIndex++;
    self.autoTimeout = setTimeout(self.autoSlide, time);

  }

  this.autoSlide = function() {
    console.log('autoslide 007');
    if(self.slides.length === 0){
      return;
    }
      self.showSlide();

    console.log(self.slides);
    console.log(self.slideIndex);
      var time = $(self.slides[self.slideIndex]).attr('data-time');
      if(!time){
         time = H2O.slideTime;
      }
      self.slideIndex++;
      self.autoTimeout = setTimeout(self.autoSlide, time); // Change image every 2 seconds
  }

  this.showSlide = function() {

    var i;
      console.log("st");
      console.log(self.slideIndex);
    if (self.slideIndex > self.slidesNum - 1) {self.slideIndex = 0}
    if (self.slideIndex < 0) {self.slideIndex = self.slidesNum - 1}
    for (i = 0; i < self.slidesNum; i++) {
      self.slides[i].style.display = "none";
      if(self.dots){
        self.dots[i].className = self.dots[i].className.replace(" active", "");
      }
    }
        console.log(self.slideIndex);
          console.log("en");
    console.log(self.slides);
    self.slides[self.slideIndex].style.display = "block";
    if(self.dots){
      self.dots[self.slideIndex].className += " active";
    }
  }

  //Click on dot
  if(self.dots){
    $(self.sliderId).on('click', '.dot',function(e){
          self.currentSlide($(this).index());
    });
  }

  //Start sslider
  this.autoSlide ();
}
/* End H2O slider */
