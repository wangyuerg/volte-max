import jQuery from 'jquery'
import 'bxslider'
import 'bxslider.css'

module.exports =  {
    deep: true,
    bind :function(el,binding) {
        // Initializing directly after destroying
        // didn't work. Wrapping it in a setTimeout
        // seems to do the trick.
        //if(binding.value.needBind){
            setTimeout(function(){
                binding.value.sliderObj = jQuery(el).bxSlider(binding.value);
            },0);
       // }
    },
    update :function(el,binding) {
        // Destroy in case it has been initialized already.
        //jQuery(el).easyDropDown('destroy');
        // Initializing directly after destroying
        // didn't work. Wrapping it in a setTimeout
        // seems to do the trick.

            setTimeout(function(){
                binding.value.sliderObj.destroySlider();
                binding.value.sliderObj = jQuery(el).bxSlider(binding.value);
            },0);



    },

    unbind :function(el) {
       // jQuery(el).niceScroll().resize();
    }
}