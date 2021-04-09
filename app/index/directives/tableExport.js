import jQuery from 'jquery'
import './export/tableExport.js'


module.exports =  {
    deep: true,
    bind :function(el,binding) {
        // Initializing directly after destroying
        // didn't work. Wrapping it in a setTimeout
        // seems to do the trick.
        setTimeout(function(){
            jQuery(el).tableExport(binding.value);
        },0);
    },
    update :function(el,binding) {
        // Destroy in case it has been initialized already.
        // Initializing directly after destroying
        // didn't work. Wrapping it in a setTimeout
        // seems to do the trick.


    },

    unbind :function(el) {
        //jQuery(el).niceScroll().resize();
    }
}