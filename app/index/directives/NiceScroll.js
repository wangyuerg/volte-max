import jQuery from 'jquery'
import 'niceScroll'

module.exports =  {
    deep: true,
    bind :function(el,binding) {
        // Initializing directly after destroying
        // didn't work. Wrapping it in a setTimeout
        // seems to do the trick.
        setTimeout(function(){
            jQuery(el).niceScroll(binding.value)
        },binding.value.delaybind?binding.value.delaybind:0);
    },
    update :function(el,binding) {
        // Destroy in case it has been initialized already.
        // Initializing directly after destroying
        // didn't work. Wrapping it in a setTimeout
        // seems to do the trick.

        setTimeout(function(){
            jQuery(el).niceScroll(binding.value);
            jQuery(el).getNiceScroll().resize();
        },binding.value.delaybind?binding.value.delaybind:0);

    },
    unbind :function(el) {
        jQuery(el).getNiceScroll().resize();
    }
}