import jQuery from 'jquery'
import 'easyDropDown'

module.exports =  {
    deep: true,
    bind :function(el,binding) {
        // Initializing directly after destroying
        // didn't work. Wrapping it in a setTimeout
        // seems to do the trick.
        setTimeout(function(){
            jQuery(el).easyDropDown(binding.value)
        },0);
    },
    update :function(el,binding) {
        // Destroy in case it has been initialized already.
        jQuery(el).easyDropDown('destroy');
        // Initializing directly after destroying
        // didn't work. Wrapping it in a setTimeout
        // seems to do the trick.
        setTimeout(function(){
            jQuery(el).easyDropDown(binding.value)
        },0);

    },

    unbind :function(el) {
        jQuery(el).easyDropDown('destroy')
    }
}