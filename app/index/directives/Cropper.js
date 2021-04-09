import jQuery from 'jquery'
import 'cropper'

module.exports =  {
    deep: true,

    bind :function(el,binding) {
        // Destroy in case it has been initialized already.
        jQuery(el).cropper('destroy')
        // Initializing directly after destroying
        // didn't work. Wrapping it in a setTimeout
        // seems to do the trick.
        setTimeout(function(){
            jQuery(el).cropper(binding.value)
        },0);
    },

    update :function(options) {
        // Destroy in case it has been initialized already.
        jQuery(this.el).cropper('destroy')
        // Initializing directly after destroying
        // didn't work. Wrapping it in a setTimeout
        // seems to do the trick.
        setTimeout(function(){
            jQuery(this.el).cropper(options)
        },0);

    },

    unbind :function() {
        jQuery(this.el).cropper('destroy')
    }
}