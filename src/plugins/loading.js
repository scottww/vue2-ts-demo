import LoadingComponent from '@/components/raw/loading/Loading.vue';

const Loading = {
  install(Vue, options) {
    const LoadingConstructor = Vue.extend(LoadingComponent);
    const instance = new LoadingConstructor();
    instance.$mount();

    document.body.appendChild(instance.$el);

    Vue.prototype.$loading = {
      show: instance.showLoading.bind(instance),
      hide: instance.hideLoading.bind(instance),
    };
  },
};

export default Loading;
