class UserEntity {
  constructor({
    _id,
    first_name,
    last_name,
    date_of_birth,
    username,
    avatar,
    wallet_balance,
    stock_balance,
    total_profit,
    number_of_assets,
    total_invested_amount,
    number_of_trades,
    createdAt,
  }) {
    this._id = _id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.date_of_birth = date_of_birth;
    this.username = username;
    this.avatar = avatar;
    this.wallet_balance = wallet_balance;
    this.stock_balance = stock_balance;
    this.total_profit = total_profit;
    this.number_of_assets = number_of_assets;
    this.total_invested_amount = total_invested_amount;
    this.number_of_trades = number_of_trades;
    this.createdAt = createdAt;
  }

  getFullName() {
    return `${this.first_name} ${this.last_name}`;
  }

  getCreatedDate() {
    const createdAtDate = new Date(this.createdAt);
    const formattedDate = createdAtDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });

    return formattedDate;
  }
}

export default UserEntity;
