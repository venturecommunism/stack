    const helper = {}

    helper.arr = {
      /**
       * Function to sort multidimensional array
       *
       * param {array} [arr] Source array
       * param {array} [columns] List of columns to sort
       * param {array} [order_by] List of directions (ASC, DESC)
       * returns {array}
       */
      multisort: function(arr, columns, order_by) {
        if(typeof columns == 'undefined') {
          columns = []
          for(x=0;x<arr[0].length;x++) {
            columns.push(x);
          }
        }

        if(typeof order_by == 'undefined') {
          order_by = []
          for(x=0;x<arr[0].length;x++) {
            order_by.push('ASC');
          }
        }

        function multisort_recursive(a,b,columns,order_by,index) {
          var direction = order_by[index] == 'DESC' ? 1 : 0;

          var is_numeric = !isNaN(a[columns[index]]-b[columns[index]]);

          var x = is_numeric ? a[columns[index]] : a[columns[index]].toLowerCase();
          var y = is_numeric ? b[columns[index]] : b[columns[index]].toLowerCase();

/*
// TODO: replace helper with something tha will work for non-numerics
            if(!is_numeric) {
                x = helper.string.to_ascii(a[columns[index]].toLowerCase(),-1),
                y = helper.string.to_ascii(b[columns[index]].toLowerCase(),-1);
            }
*/
          if(x < y) {
            return direction == 0 ? -1 : 1;
          }

          if(x == y)  {
            return columns.length-1 > index ? multisort_recursive(a,b,columns,order_by,index+1) : 0;
          }

          return direction == 0 ? 1 : -1;
        }

        return arr.sort(function (a,b) {
          return multisort_recursive(a,b,columns,order_by,0);
        })
      }
    }

export default helper
