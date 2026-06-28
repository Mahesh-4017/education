export const features = [
    "role",
    "admin",
    "blog",
    "category",
    "language",
    "recharge",
    "astrologer",
    "user",
    "transition",
    "chat",
    "report",
];

export const actions = ["create", "update", "delete", "view"];
export const permissions = features.flatMap((feature) =>
    actions.map((action) => `${feature}:${action}`)
);
