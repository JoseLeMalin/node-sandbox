// https://blog.logrocket.com/testing-typescript-apps-using-jest/

test("Users - Get 572fd46c-bf11-4eca-acb4-cf9c8168c1b0 success", async () => {
  try {
    const result = await fetch(
      "http://localhost:3000/users/572fd46c-bf11-4eca-acb4-cf9c8168c1b0",
    )
      .then((res) => res.json())
      .catch((e) => {
        throw new Error(e);
      });

    console.log("result test = ", result);
    expect(result).toEqual({
      id: "572fd46c-bf11-4eca-acb4-cf9c8168c1b0",
      email: "tdesst@ddssjdkf.at",
      password:
        "8e0f5bcaca9f367c1f44f5ff3c04bd0a7c428ea9040675157b641c4383db9c52",
      name: "Name",
    });
  } catch (error) {
    expect(error).toMatch("error");
  }
});
