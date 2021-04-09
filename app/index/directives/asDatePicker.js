import jQuery from 'jquery'
import './asDatepicker/src/jquery-asDatepicker.js'
import './asDatepicker/css/asDatepicker.css'
module.exports =  {
    deep: true,
    bind :function(el,binding) {
        // Initializing directly after destroying
        // didn't work. Wrapping it in a setTimeout
        // seems to do the trick.
        setTimeout(function(){
            jQuery(el).asDatepicker(binding.value)
        },0);
    },
    update :function(el,binding) {
        // Destroy in case it has been initialized already.
        // Initializing directly after destroying
        // didn't work. Wrapping it in a setTimeout
        // seems to do the trick.
        //jQuery(el).datetimepicker('remove');
       /* setTimeout(function(){
            jQuery(el).asDatepicker(binding.value)
        },0);*/
        //console.log(2333);
    },

    unbind :function(el) {
        //jQuery(el).datetimepicker('remove')
    }
}