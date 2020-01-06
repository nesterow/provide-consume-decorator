// tslint:disable-next-line: variable-name
export const __provide__ = "$$provide$$"; // container key, doesn't work with Symbol

/**
 * Consume decorator
 * Transforms a class member into getter that resolves an instance from provider container
 * @prop path: string - name of the registered entity
 */
export function consume(path: string): PropertyDecorator {
  // tslint:disable-next-line: only-arrow-functions
  return function(target: object, propertyKey: string | symbol) {
    Object.defineProperty(target, propertyKey, {
      get() {
        const service: any = this[__provide__][path];
        return typeof service === "function" ? service.bind(this)() : service;
      },
    });
  };
}

/**
 * Provide decorator for vuex
 * Adds a dependecy contatiner to the class instance, can work whether with VuexStore object or a javascript class
 * @prop data: Object<{[string]: any}> - a javascript object that provides a dependency container
 */
export function provideVuex(data: any): ClassDecorator  {
  // tslint:disable-next-line: only-arrow-functions
  return function(constructor: any) {
    if (constructor.getters) {
      constructor.getters[__provide__] = () =>  data;
    } else {
      Object.defineProperty(constructor.prototype, __provide__, {
        get() {
          return data;
        },
      });
    }
  };
}

/**
 * Provide decorator for a javascript class
 * Adds a dependecy contatiner to the class instance
 * @prop data: Object<{[string]: any}> - a javascript object that provides a dependency container
 */
export function provide(data: any): ClassDecorator {
  // tslint:disable-next-line: only-arrow-functions
  return function(constructor: any) {
    Object.defineProperty(constructor.prototype, __provide__, {
      get() {
        return data;
      },
    });
  };
}
