class Tree {

	/**
	 * Initialize tree
	 */
	static init() {
		this.tree = [];
		this.mapped_arr = {};
	}

	/**
	 * @desc Bulid category tree
	 * @param array data category from db
	 */
	static buildTree(data) {
		
		// Build a hash table and map data to objects
		for(var i=0; i<data.length; i++) {
			var id = parseInt(data[i].id);
			if(!this.mapped_arr.hasOwnProperty(id)) {
				this.mapped_arr[id] = data[i];
				this.mapped_arr[id].children = [];
			}
		}

		// Loop over hash table
		for(var id in this.mapped_arr){
			if(this.mapped_arr.hasOwnProperty(id)) {
				var mapped_elem = this.mapped_arr[id];

				// If the element is not at the root level, add it to its parent array of children.
				// Note this will continue till we have only root level elements left
				if(parseInt(mapped_elem.parent_id)) {
					var parent_id = parseInt(mapped_elem.parent_id);
					this.mapped_arr[parent_id].children.push(mapped_elem);
				} else {
					// If the element is at the root level, directly push to the tree
					this.tree.push(mapped_elem);
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
	static addNode(node) {

		// add the new child in maapedArr
		if(!this.mapped_arr.hasOwnProperty(node.id)) {
			this.mapped_arr[node.id] = node;
			this.mapped_arr[node.id].children = [];
		}

		// Add the child to it's parent node
		this.mapped_arr[node.parent_id].children.push(node);
	}

	/**
	 * @desc	Get Parent Node
	 * 
	 * @param 	int	node_id id of the child node
	 */
	static getParent(node_id) {
		return this.mapped_arr[this.mapped_arr[node_id].parent_id];
	}

	/**
	 * @desc	Get the Node
	 * 
	 * @param int	id	Id of the node
	 * 
	 * @rerurn string
	 */
	static getNode(id) {
		return this.mapped_arr[id];
	}

	/**
	 * @desc	Remove Node
	 * 
	 * @param	int	id	id of the node 
	 * 
	 * @return	string
	 */
	static removeNode(id) {

		// delete from mapped_arr
		if(this.mapped_arr.hasOwnProperty(id)) {
			delete this.mapped_arr[id];
		}else {
			return 'Not Found';
		}

		// delete from tree
		return this.removeNodeFromTree(this.tree, id);

	}

	/**
	 * @desc	Remove node from Tree
	 * 
	 * @param	Tree	tree		this.tree
	 * @param	int		target_id	id of the removable node
	 * 
	 * @return	string
	 */
	static removeNodeFromTree(tree, target_id) {

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

	static countAncestor(node) {

		if(node.parent_id == 0) {
			return 1;
		}
		return this.countAncestor(this.getParent(node.id)) + 1;
	}

	static getTree() {
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


// var tree = new Tree();

// var cats_data = Client.pageData.cats_db;
// tree.buildTree(cats_data);

// console.log('Tree init:')
// console.log(JSON.stringify(tree.getTree(), null, " "));

// console.log('Parent of node 3:');
// console.log(tree.getParent(3));

// console.log('Add node 7:');
// tree.addNode(new Node(7, 'new', cats_data[0], 4));

// console.log('Print tree again:')
// console.log(JSON.stringify(tree.getTree(), null, " "));

// console.log('Get Node 7:');
// console.log(tree.getNode(7));

// console.log('Remove Node 7:')
// console.log(tree.removeNode(7));

// console.log('Print tree again:')
// console.log(JSON.stringify(tree.getTree(), null, " "));

// console.log('Remove Node 7 again:')
// console.log(tree.removeNode(7));
