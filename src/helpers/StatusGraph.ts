class StatusGraph {
  private edges: Map<number, number[]>;

  constructor() {
    this.edges = new Map<number, number[]>();
  }

  // Thêm cạnh vào đồ thị, từ trạng thái này sang trạng thái khác
  addEdge(from: number, to: number): void {
    const connections = this.edges.get(from);
    if (connections) {
      connections.push(to);
    } else {
      this.edges.set(from, [to]);
    }
  }

  // Kiểm tra xem có thể chuyển từ trạng thái này sang trạng thái khác không
  canChangeStatus(from: number, to: number): boolean {
    const connections = this.edges.get(from);
    return connections ? connections.includes(to) : false;
  }

  // Lấy ra các trạng thái có thể chuyển đổi từ một trạng thái cụ thể
  getNextStates(currentStatus: number): number[] {
    return this.edges.get(currentStatus) || [];
  }
}

export default StatusGraph;
