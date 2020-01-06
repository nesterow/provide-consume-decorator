
# provide-consume-decorator

### Usage

```typescript
@provide({
  test: "test",
  service() {
    return "service";
  },
})
class MyClass {
  @consume("test") public test!: any;
  @consume("service") public service!: any;
}

const my = new MyClass();
(my.test === "test");
(my.service == "service");
```

### Api

#### @provide({...dependecies})
Provide dependecies to a class

#### @provideVuex({...dependecies})
Provide dependecies for a vuex module

#### @consume("name") prop!
A property decorator. Supplies dependency to a class member.


### Commands
* `npm run clean`: clean the output folders `./es` and `./js`.
* `npm run tslint`: lint the ts files
* `npm run tsc`: compile the TypeScript in `./ts` into ES2015 in the `./es` folder.
* `npm run babel`: compile the ES2015 in the `./es` into JavaScript in the `./js` folder.
* `npm run compile`: run both the tsc and the babel steps.
* `npm run test`: run unit tests.
* `npm run watch`: continuously run unit tests.


