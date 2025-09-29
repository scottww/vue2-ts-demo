import Mock from "mockjs";

// 匹配带参数的 GET
Mock.mock(/\/api\/users(\?.*)?/, "get", {
  code: 200,
  data:{
    users: [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" }
    ]
  }
})

Mock.mock("/api/users", "post", (options) => {
  const body = JSON.parse(options.body);
  const newUser = {
    id: Date.now(), // 简单生成唯一 ID
    name: body.name
  };
  return {
    code: 200,
    msg: `添加成功: ${body.name}`,
    data: newUser // 返回新增的 user
  };
});

Mock.mock("/api/users", "delete", (options) => {
  const body = JSON.parse(options.body);
  return {
    code: 200,
    msg: `删除成功: ${body.id}`
  };
});
