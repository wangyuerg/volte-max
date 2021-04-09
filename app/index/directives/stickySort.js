import jQuery from 'jquery'
import 'niceScroll'
require('./stickySort/js/jquery.ba-throttle-debounce.min.js')
require('stickySort')
require('stickySort.css')

module.exports =  {
    deep: true,
    bind :function(el,binding) {
    },
    update :function(el,binding) {
        setTimeout(function(){
            if(binding.value.isFirst == 'ready'){
                jQuery(el).find('table').stickySort(binding.value);
                //jQuery(el).find('.sticky-wrap').addClass('nice-scorll');
                //jQuery(el).find('.sticky-wrap').addClass('option2');
                jQuery(el).find('.sticky-wrap').niceScroll(binding.value.niceScroll);
                jQuery(el).find('.sticky-wrap').resize();
                binding.value.isFirst ='fine';
            }else if(binding.value.isFirst == 'fine'){
                 jQuery(el).find('.sticky-wrap').getNiceScroll().resize();
                jQuery(el).find('.sticky-wrap').resize();
            }

            jQuery(el).find('.sticky-col table tbody').empty();
            jQuery(el).find('.sticky-wrap table tbody tr').each(function(){
                if(jQuery(this).find('th').clone().get(0)){
                    var c = jQuery(this).find('th').clone().get(0).outerHTML;
                    jQuery(el).find('.sticky-col table tbody').append('<tr>'+c+'</tr>');
                }
            });
            var _head = jQuery(el).find('.sticky-wrap table thead tr').eq(0);
            var _head_str = '';
            _head.find('th').each(function(){
                _head_str +='<th  style="width:'+$(this).outerWidth()+'px">'+$(this).html()+'</th>'
            });
            jQuery(el).find('.sticky-thead table thead tr').empty().append(_head_str);
        },0);

    },

    unbind :function(el) {
        jQuery(el).find('.sticky-wrap').getNiceScroll().resize();
    }
}