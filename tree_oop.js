class Tree {

	/**
	 * Initialize tree
	 */
	constructor() {
		this.tree = [];
		this.mappedArr = {};
	}

	/**
	 * @desc Bulid category tree
	 * @param array data category from db
	 */
	buildTree(data) {
		
		// Build a hash table and map data to objects
		for(var i=0; i<data.length; i++) {
			var id = parseInt(data[i].id);
			if(!this.mappedArr.hasOwnProperty(id)) {
				this.mappedArr[id] = data[i];
				this.mappedArr[id].children = [];
			}
		}

		// Loop over hash table
		for(var id in this.mappedArr){
			if(this.mappedArr.hasOwnProperty(id)) {
				var mappedElem = this.mappedArr[id];

				// If the element is not at the root level, add it to its parent array of children.
				// Note this will continue till we have only root level elements left
				if(parseInt(mappedElem.parent_id)) {
					var parent_id = parseInt(mappedElem.parent_id);
					this.mappedArr[parent_id].children.push(mappedElem);
				} else {
					// If the element is at the root level, directly push to the tree
					this.tree.push(mappedElem);
				}
			}
		}
	}

	/**
	 * @desc	Add children
	 * 
	 * @param	Node	child 		category
	 * @return void
	 */
	addNode(node) {

		// add the new child in maapedArr
		if(!this.mappedArr.hasOwnProperty(node.id)) {
			this.mappedArr[node.id] = node;
			this.mappedArr[node.id].children = [];
		}

		// Add the child to it's parent node
		this.mappedArr[node.parent_id].children.push(node);
	}

	/**
	 * @desc	Get Parent Node
	 * 
	 * @param 	int	node_id id of the child node
	 */
	getParent(node_id) {
		return this.mappedArr[this.mappedArr[node_id].parent_id];
	}

	/**
	 * @desc	Get the Node
	 * 
	 * @param int	id	Id of the node
	 * 
	 * @rerurn string
	 */
	getNode(id) {
		return this.mappedArr[id];
	}

	removeNode(id) {

		// delete from mappedArr
		if(this.mappedArr.hasOwnProperty(id)) {
			delete this.mappedArr[id];
		}else {
			return 'Not Found';
		}

		// delete from tree
		return this.removeNodeFromTree(this.tree, id);

	}

	removeNodeFromTree(tree, target_id) {

		for(var i=0; i<tree.length; i++){
			if(tree[i].id == target_id) {
				tree.splice(i, 1);
				return;
			}

			if(tree[i].children) {
				this.removeNodeFromTree(tree[i].children, target_id);
			}
		}

		return 'Removed'
	}

	getTree() {
		return this.tree;
	}
}

/**
 * We can initialize child node data before adding to tree by this class
 */
class Node {
	constructor(id, name, data, parent_id) {
		this.id = id;
		this.name = name;
		this.data = data;
		this.parent_id = parent_id;
	}
}


var tree = new Tree();

var cats_data = Client.pageData.cats_db;
tree.buildTree(cats_data);

console.log('Tree init:')
console.log(JSON.stringify(tree.getTree(), null, " "));

console.log('Parent of node 3:');
console.log(tree.getParent(3));

console.log('Add node 7:');
tree.addNode(new Node(7, 'new', cats_data[0], 4));

console.log('Print tree again:')
console.log(JSON.stringify(tree.getTree(), null, " "));

console.log('Get Node 7:');
console.log(tree.getNode(7));

console.log('Remove Node 7:')
console.log(tree.removeNode(7));

console.log('Print tree again:')
console.log(JSON.stringify(tree.getTree(), null, " "));

console.log('Remove Node 7 again:')
console.log(tree.removeNode(7));
