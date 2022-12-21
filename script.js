
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
    delete(value, node= this.root){
        let minRight;
        if(node === null) return null     //Case not found value & exit

        if(value < node.data){
            if ( node.left ) {
                node.left = this.delete( value, node.left );
              }//else it will return an empty node --> return null.
        }else if (value > node.data){
            if ( node.right ) {
                node.right = this.delete( value, node.right );
              }
        }else{       // at this point, value === node.value
            if ( node.left === null && node.right === null ) {//CASE 1: leaf
                node = null;
            }else if( node.left === null ) { //CASE 2: One subnode only
                node = node.right;
            }else if ( node.right === null ) {//CASE 2: One subnode only
                node = node.left;
            }else{ //CASE 3: node has left and right
                minRight   = this.findMinValue( node.right );
                node.data = minRight.data;
                node.right = this.delete( minRight.data, node.right );
            }
        }
        return node;
    }
 
    findMinValue (node){
        if (node.left === null)return node;
        return this.findMinValue(node.left)
    }
    
    find (value, node=this.root){
        if(node===null || node.data === value) return node
        // Key is greater than root's key
        if (value > node.data) return this.find(value, node.right);
        // Key is smaller than root's key
        return this.find(value, node.left);
    }

    bfs (doSomething){
        const array =[this.root]
        while (array.length>0){
            doSomething(array[0])
            if (array[0].left !== null){
                array.push(array[0].left);
            }
            if (array[0].right !== null){
                array.push(array[0].right);
            }
            array.shift()
        }
    }
    dfs(doSomething, node=this.root){
        doSomething(node)
        if(node === null) return;
        if(node.left!== null){
            this.dfs(doSomething,node.left)
        }
        if (node.right !== null){
            this.dfs(doSomething,node.right)
        }
    }
    height (node){
       if(!node) return 0
       return 1+ Math.max(this.height(node.right), this.height(node.left))
    }

    depth (nodeSearch, node= this.root, edgeCount=0){
        if(node===null)return
        if(node.data === nodeSearch.data) return edgeCount;

        if(node.data < nodeSearch.data){
            return this.depth(nodeSearch, node.right, (edgeCount+1))
        }else{
            return this.depth(nodeSearch, node.left, (edgeCount+1))
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

const printData = (node) =>{
    console.log(node.data)
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
console.log('---------------------------------')
tree.delete(8)
prettyPrint(tree.root) 
console.log(tree.depth(tree.find(67)))


// Write an insert and delete functions which accepts a value to insert/delete 
// (you’ll have to deal with several cases for delete such as when a node has children or not).
//  If you need additional resources, check out these two articles on inserting and deleting, 
//  or this video with several visual examples.
 