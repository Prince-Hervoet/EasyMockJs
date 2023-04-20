# EasyMockJs

This is a easy mock project,it can mock some test data without changing your service codes.

Now,you can use [object,number] to create some random data for your api.
```
    EasyMock.intercept();
    EasyMockContainer.setUrlInfo(
      {
        method: "GET",
        url: "http://localhost:9090/user/serfd",
      },
      [
        {
          username: () => randomeGenerate.generateString(2, ["Mike ", "Tell"]),
          id: () => randomeGenerate.uuid(),
          info: {
            id: () => randomeGenerate.generateInteger(),
            address: [() => randomeGenerate.generateString(3), 3],
            uuk: "asdfasdf",
          },
        },
        4,
      ]
    );
```

```
    // template like this
    [
        {
            username: () => generateString(2, ["Mike ", "Tell"]),
            id: () => uuid(),
            info: {
            id: () => generateInteger(),
            address: [() => generateString(3), 3],
            },
        },
        4,
    ]

    // get this
    [
        {
            username: 'Mike Mike ',
            id: 'e0207335-1910-40ec-bc13-d5a4a5b50e07',
            info: { id: 2225712574, address: [Array] }
        },
        {
            username: 'Mike Tell',
            id: 'ff8bdd73-451d-47ae-a116-0adc4407a1f6',
            info: { id: 1021104786, address: [Array] }
        },
        {
            username: 'Mike Mike ',
            id: '5c4b25fa-7c67-4aeb-bc57-7c3b99bc2c37',
            info: { id: 1357684412, address: [Array] }
        },
        {
            username: 'Mike Tell',
            id: '14522038-52c1-4917-9f4a-f888d624632e',
            info: { id: 1293617357, address: [Array] }
        }
    ]
```
