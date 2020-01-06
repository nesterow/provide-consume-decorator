import test from "ava";

import {__provide__, consume, provide, provideVuex} from "./index";

test("index:provide-consume", (t) => {
  @provide({
    test: "test",
    service() {
      return "service";
    },
  })
  class TestConsumer {
    @consume("test") public test!: any;
    @consume("service") public service!: any;
  }

  const consumer = new TestConsumer();
  t.is(consumer.test, "test");
  t.is(consumer.service, "service");
});

test("index:provideVue-consume", (t) => {
  // tslint:disable-next-line: max-classes-per-file
  @provideVuex({
    test: "test",
    service() {
      return "service";
    },
  })
  class TestConsumer {
    @consume("test") public test!: any;
    @consume("service") public service!: any;
  }

  const consumer = new TestConsumer();
  t.is(consumer.test, "test");
  t.is(consumer.service, "service");

  // tslint:disable-next-line: max-classes-per-file
  @provideVuex({
    test: "test",
    service() {
      return "service";
    },
  })
  class TestConsumerVuex {
    public static getters: any = {};
  }
  t.is(TestConsumerVuex.getters[__provide__]().test, "test");
  t.is(TestConsumerVuex.getters[__provide__]().service(), "service");
});
