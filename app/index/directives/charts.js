import jQuery from 'jquery'
import echarts from 'echarts'

module.exports =  {
    deep: true,
    bind :function(el,binding) {
        // Initializing directly after destroying
        // didn't work. Wrapping it in a setTimeout
        // seems to do the trick.
        setTimeout(function(){
            var chart = echarts.init(jQuery(el).get(0));
            chart.setOption(binding.value);
            if(binding.value.clickfn)chart.on('click',binding.value.clickfn);
            if(binding.value.datazoomfn)chart.on('datazoom',binding.value.datazoomfn);
        },0);
    },
    update :function(el,binding,vnode,oldVnode) {

    },

    unbind :function(el) {
        var chart = echarts.init(jQuery(el).get(0));
        chart.clear();
    }
}