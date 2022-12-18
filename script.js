
// Build a Tree class / factory which accepts an array when initialized. 
// The Tree class should have a root attribute which uses the return value 
// of buildTree which you’ll write next.

class Node {
    constructor (value){
        this.data = value;
        this.right = null;
        this.left = null;
    }
}

class Tree {
    constructor (array){
        this.root = buildTree(array);
    }

    insert (value,node=this.root){
        if(value > node.data){
            if(node.right===null){
                node.right = new Node(value)
                return
            }
            this.insert (value,node.right)
        }else if (value < node.data){
            if(node.left===null){
                node.left = new Node(value)
                return
            }
            this.insert(value,node.left)
        }else{
            return
        }
    }

    delete(value){
        const nodeInfo = this.find(value);
        if(nodeInfo===null) return
        this.deleteNode(nodeInfo[0],nodeInfo[1])
        
    }

    deleteNode(previous_node,node){
        let position = '';
        if (previous_node.data > node.data) {
            position='left';
        }else{
            position='right';
        }
        
        if (node.right===null && node.left===null){
            previous_node[position]=null;
        }else if (node.right===null || node.left===null){
            if(node.right === null){
                previous_node[position]=node.left;
            }else{
                previous_node[position]=node.right;
            }
        }else{
            
            const replacement_node = this.findReplacement(node);
            node.data = replacement_node[1].data
            console.log(replacement_node[0], replacement_node[1])
            return this.deleteNode(replacement_node[0], replacement_node[1]);
        }
    }

    findReplacement(node , previous_node = null){
        if(previous_node===null){
            if(node.right.left===null) return [node,node.right]
            return this.findReplacement(node.right,node)
        }
        if(node.left === null) return [previous_node,node]
        return this.findReplacement(node.left, node)
    }
    find (value, previous_node = null, current_node=this.root){
        if (current_node.data === value && previous_node !== null) {
            console.log(current_node)
            console.log([previous_node,current_node])
            return [previous_node,current_node]
        }
        if(value > current_node.data){
            if(current_node.right === null) return null
            console.log([current_node,current_node.right])
            return this.find(value,current_node,current_node.right)
        }else{
            if(current_node.left === null) return null
            return this.find(value,current_node,current_node.left)
        }
    }
}

function buildTree(array){
    const sorted= quicksort(array)
    deleteDuplicates(sorted)
    let root= sortedArrayToBST(sorted, 0,sorted.length-1)
    return root;
}

function sortedArrayToBST(arr, start, end)
{
    /* Base Case */
    if (start > end)
    {
        return null;
    }
    /* Get the middle element and make it root */
    var mid = parseInt((start + end) / 2);
    var node = new Node(arr[mid]);
    /* Recursively construct the left subtree and make it
     left child of root */
    node.left = sortedArrayToBST(arr, start, mid - 1);
    /* Recursively construct the right subtree and make it
     right child of root */
    node.right = sortedArrayToBST(arr, mid + 1, end);
    
    return node;
}

function quicksort(array) {
    if (array.length <= 1) {
      return array;
    }
    let pivot = array[0]; 
    let left = []; 
    let right = [];
    for (let i = 1; i < array.length; i++) {
      array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
    }
    return quicksort(left).concat(pivot, quicksort(right));
  };

function deleteDuplicates (array){
    for(let i =0; i< array.length; i++){
        if (array[i]===array[i+1]){
            array.splice(i,1)
        }
    }
}
 
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

const test = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]

const tree = new Tree(test)
tree.insert(310)
tree.insert(311)
tree.insert(309)
prettyPrint(tree.root)  
tree.delete(67)
// prettyPrint(tree.root) 

// Write an insert and delete functions which accepts a value to insert/delete 
// (you’ll have to deal with several cases for delete such as when a node has children or not).
//  If you need additional resources, check out these two articles on inserting and deleting, 
//  or this video with several visual examples.
 