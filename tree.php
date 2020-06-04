<?php

?>
<html>
<head>
	<title>test</title>
</head>
<body>

    <script src="cat.js"></script>
    <script>
        const data = [
            { id: 56, parentId: 62, name: 'A' },
            { id: 81, parentId: 80, name: 'B' },
            { id: 74, parentId: null, name: 'root' },
            { id: 76, parentId: 80, name: 'C' },
            { id: 63, parentId: 62, name: 'D' },
            { id: 80, parentId: 86, name: 'E' },
            { id: 87, parentId: 86, name: 'F' },
            { id: 62, parentId: 74, name: 'G' },
            { id: 86, parentId: 74, name: 'H' },
        ];

        const idMapping = data.reduce((acc, el, i) => {
            acc[el.id] = i;
            return acc;
        }, {});

        let root;
        data.forEach(el => {

            // Handle the root element
            if (el.parentId === null) {
                root = el;
                return;
            }
            // Use our mapping to locate the parent element in our data array
            const parentEl = data[idMapping[el.parentId]];
            // Add our current el to its parent's `children` array
            parentEl.children = [...(parentEl.children || []), el];
        });

        //console.log(root);

        
        
    </script>

</body>
</html>