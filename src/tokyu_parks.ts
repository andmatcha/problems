const PARKS = [
  { symbol: "A", name: "世田谷公園" },
  { symbol: "B", name: "中目黒公園" },
  { symbol: "C", name: "駒澤オリンピック公園" },
  { symbol: "D", name: "碑文谷公園" },
  { symbol: "E", name: "林試の森公園" },
  { symbol: "F", name: "二子玉川公園" },
  { symbol: "G", name: "等々力渓谷公園" },
  { symbol: "H", name: "洗足池公園" },
  { symbol: "I", name: "戸越公園" },
];

const DATA = [
  { route: ["A", "B"], time: 10 },
  { route: ["A", "C"], time: 20 },
  { route: ["A", "D"], time: 12 },
  { route: ["A", "E"], time: 15 },
  { route: ["B", "E"], time: 10 },
  { route: ["C", "D"], time: 10 },
  { route: ["C", "F"], time: 25 },
  { route: ["C", "G"], time: 20 },
  { route: ["C", "H"], time: 30 },
  { route: ["D", "E"], time: 15 },
  { route: ["D", "H"], time: 20 },
  { route: ["E", "H"], time: 15 },
  { route: ["E", "I"], time: 18 },
  { route: ["F", "G"], time: 5 },
  { route: ["G", "H"], time: 35 },
  { route: ["H", "I"], time: 12 },
];

type Output = {
  route: string[];
  time: string;
}[];

// 既存の経路の配列を渡すと考えうる次の地点を追加した経路の配列を返す
const connectRoutes = (routes: string[][]): string[][] => {
  const newRoutes: string[][] = [];
  for (let route of routes) {
    // 現状の経路の最終地点
    const routeEnd = route[route.length - 1];
    for (let row of DATA) {
      // 新しい経路を見つける
      if (!row.route.includes(routeEnd)) {
        continue;
      }
      // 次の地点
      const newPoint = row.route.find((point) => point !== routeEnd) ?? null;
      // すでに一回通っていたらダメ
      if (newPoint === null || route.includes(newPoint)) {
        continue;
      }
      // 条件をクリアした経路を登録
      newRoutes.push([...route, newPoint]);
    }
  }

  // 全ての公園を巡り尽くしたとき
  if (newRoutes.length === 0) {
    // 直接起点に戻れる経路のみを絞り込み
    const result = routes.filter((route) => judgeCanReturn(route));
    // 終点を追加
    for (let route of result) {
      route.push(route[0]);
    }
    return result;
  }

  return connectRoutes(newRoutes);
};

// arrに含まれる要素がtargetに全て含まれていたらtrue, それ以外はfalse
const isAllIncludes = (
  arr: (string | number)[],
  target: (string | number)[]
): boolean => arr.every((el) => target.includes(el));

// 渡した経路が初期地点に直接帰ることができるか判定
const judgeCanReturn = (route: string[]): boolean => {
  const startPoint = route[0];
  const endPoint = route[route.length - 1];
  for (let row of DATA) {
    if (isAllIncludes([startPoint, endPoint], row.route)) {
      return true;
    }
  }

  return false;
};

// アルファベットの配列を公園名の配列に変換
const replaceSymbolWithParkName = (symbolArray: string[]) => {
  const parkNameArray: string[] = [];
  for (let symbol of symbolArray) {
    const park = PARKS.find((park) => park.symbol === symbol) ?? null;
    if (park) {
      parkNameArray.push(park.name);
    }
  }

  return parkNameArray;
};

// 経路から所要時間を計算
const calcTime = (route: string[]): number => {
  let time = 0;
  for (let i = 0; i < route.length - 1; i++) {
    DATA.forEach((dataItem) => {
      if (isAllIncludes([route[i], route[i + 1]], dataItem.route)) {
        time += dataItem.time;
      }
    });
  }

  return time;
};

const main = (startPoint: string) => {
  // 考えうる経路
  let resultRoutes = connectRoutes([[startPoint]]);

  // 整形して出力
  let output: Output = [];
  for (let resultRoute of resultRoutes) {
    const route = replaceSymbolWithParkName(resultRoute);
    const time = calcTime(resultRoute);
    output.push({ route: route, time: `${time}分` });
  }
  console.log(output);

  return;
};

main("A");
