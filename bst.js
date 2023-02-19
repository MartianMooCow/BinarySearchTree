let data = [0, 7, 1, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let removedDupes = [...new Set(data)]
let sortedArray = removedDupes.sort((a,b)=>{
    return a-b;
})

function same(x){
    return x
}


class Node {
    constructor(data,left=null,right=null){
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array,startIndex,endIndex){
        this.root = buildTree(array,0,n-1);
    }

    insert(val,current = this.root){    
        
        if(val > current.data && !current.right){
            current.right = new Node(val)
            return;
        }
        if(val < current.data && !current.left){
            current.left = new Node(val)
            return;
        }

        if(val > current.data){
            this.insert(val,current = current.right)
        }else if(val < current.data){
            this.insert(val,current = current.left)
        }else{
            console.log("Tree already contains your value")
        }
        
    }

    delete(val,current = this.root){
        
        if(current === null) return current;

        if(val < current.data) current.left = this.delete(val,current.left);
        else if( val > current.data) current.right = this.delete(val,current.right);
        else {
            if(!current.right && !current.left) return null;
            else if(!current.right && current.left) return current.left;
            else if(current.right && !current.left) return current.right;



        }
        return current;
    }

    find(val,current = this.root){


        if(current === null){
            console.log("No such value")
            return;
        }else{
            if(val === current.data){
                prettyPrint(current)
                return current;
            }

            if(val>current.data){
                this.find(val,current.right)
            }else if( val < current.data){
                this.find(val,current.left)
            }
        }
        

    }

    levelOrder(fn,current = this.root){
        let result = [];
        
        if(current == null) return;
        
        result.push(current)

        while(result !== []){
            current = result[0]
            console.log(fn(current.data))
            if(current.left) result.push(current.left);
            if(current.right) result.push(current.right);
            result.shift()
        }
    }

    preOrder(fn,current = this.root){

        if(!current) return;

        console.log(fn(current.data))

        if(current.left) this.preOrder(fn,current.left)
        if(current.right) this.preOrder(fn,current.right)

    }

    inOrder(fn,current = this.root){
    
        if(!current) return;

        if(current.left) this.inOrder(fn,current.left)
        console.log(fn(current.data))
        if(current.right) this.inOrder(fn,current.right)
        
    }


    postOrder(fn,current = this.root){
        
        if(!current) return;

        if(current.left) this.postOrder(fn,current.left)
        if(current.right) this.postOrder(fn,current.right)
        console.log(fn(current.data))
    }

    height(current = this.root){
        

        if(!current) return -1;
        
        let left = this.height(current.left)
        let right = this.height(current.right);

        if(left > right) return left+1
        else return right+1

    }

    depth(val,current = this.root){
        let count = 0;

        if(!current) return;

        while(current.data != val){
            if(current.data > val){
                current = current.left;
                count++
            }else if(current.data < val){
                current = current.right;
                count++
            }
        }
        console.log(count)
        return count;

    }

    isBalanced(current = this.root){
        let left ;
        let right;
        
        if(!current) return -1;
        
        while(current){
            

            left = this.height(current.left)
            right = this.height(current.right);
            
            if(left > right) left+1
            else right+1

            break;

        }
        

        if(Math.abs(left-right)>1){ 
            console.log(false)
            return ;
        }else {
            console.log(true)
            return ;
        }
    }

    balance(current = this.root){
        let array = [];
        let count = 0;
        let result = [];

        if(!current) return;

        array.push(current)
        
        while(array[count]){
            
            if(current.left && current.right){
                array.push(current.left)
                array.push(current.right)
            }else{
                if(current.left && !current.right) array.push(current.left)
                if(!current.left && current.right) array.push(current.right)
            }
            count++;
            current = array[count];
            

        }
       
        for(let i=0;i<array.length;i++){
            result.push(array[i].data)
        }
        
        let removeDupe = [...new Set(result)];

        let dupeSortArray = removeDupe.sort((a,b)=>{
            return a-b;
        })

        console.log(result)

        
        
       this.root = buildTree(dupeSortArray,0,result.length-1)
        


    }


}




function buildTree(array,startIndex,endIndex){

    if(startIndex>endIndex){
        return null;
    }
    
    let midIndex = Math.floor((startIndex+endIndex)/2);

    let node = new Node(array[midIndex])
    
    node.left = buildTree(array,startIndex,midIndex-1)
    node.right = buildTree(array,midIndex+1,endIndex)
    
    return node;
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



let n = sortedArray.length;
let test = new Tree(sortedArray,0,n-1)

// test.insert(6346)
// test.insert(2)
// test.insert(6344)
// test.insert(24)
// test.find(879)
// test.levelOrder(same)
// test.preOrder(same)
// test.inOrder(same)
// test.postOrder(same)
// console.log(test.height())
test.insert(66668)
test.insert(66664)
test.insert(66665)
test.insert(666621)
test.insert(66669)
test.insert(6346)
test.insert(2)
test.insert(68)
test.insert(10)

prettyPrint(test.root)

test.balance()

prettyPrint(test.root)






