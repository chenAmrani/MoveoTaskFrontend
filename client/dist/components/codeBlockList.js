import { jsx as _jsx } from "react/jsx-runtime";
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const CodeBlockList = ({ codeBlocks }) => {
    const navigate = useNavigate();
    const customColors = ['#2d2d2d', '#2d2d2d', '#2d2d2d', '#2d2d2d'];
    console.log("codeBlocks", codeBlocks);
    return (_jsx(ListGroup, { className: "list", children: codeBlocks.map((block, index) => {
            const color = customColors[index] || '#ffff';
            return (_jsx(ListGroup.Item, { action: true, onClick: () => navigate(`/codeblock/${block._id}`), style: {
                    backgroundColor: color,
                    justifyContent: 'center',
                    width: '100%',
                    alignItems: 'center',
                    color: 'white',
                    textAlign: 'center',
                    marginBottom: '25px',
                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.8)',
                    borderRadius: '10px',
                }, children: block.blockTitle }, block._id));
        }) }));
};
export default CodeBlockList;
