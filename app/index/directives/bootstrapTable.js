import jQuery from 'jquery'
import 'bootstrapTable'
import 'bootstrapTable.css'

module.exports =  {
    deep: true,
    bind :function(el,binding) {
        // Initializing directly after destroying
        // didn't work. Wrapping it in a setTimeout
        // seems to do the trick.
        jQuery(el).bootstrapTable('destroy');
        setTimeout(function(){
            jQuery(el).bootstrapTable(binding.value);
        },0);
    },
    update :function(el,binding) {
        // Destroy in case it has been initialized already.
        jQuery(el).bootstrapTable('destroy');
        // Initializing directly after destroying
        // didn't work. Wrapping it in a setTimeout
        // seems to do the trick.
        setTimeout(function(){

            setTimeout(function(){
                jQuery(el).bootstrapTable(binding.value);
            },0);
        },0);

    },

    unbind :function(el) {
        jQuery(el).easyDropDown('destroy')
    }
}