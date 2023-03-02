/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
    return convertBST(nums, 0, nums.length-1)
};

var convertBST = function(nums,beg,end){
    if(beg>end) return null;
    
    let mid = Math.ceil((beg+end)/2);
    let root = new TreeNode(nums[mid]);
    root.left = convertBST(nums, beg,mid-1);
    root.right = convertBST(nums, mid+1, end)
    return root
}