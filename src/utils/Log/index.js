//定义一个 log 装饰器
export const log = function () {
  return function (target, name, descriptor) {
    console.log(target, name, descriptor);
    const fn = descriptor.value;
    descriptor.value = function (...args) {
      console.log(`调用方法${name}前打印的日志`);
      fn.call(this, ...args);
      console.log(`调用方法${name}后打印的日志`);
    };
  };
};
