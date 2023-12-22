import PropTypes from 'prop-types';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

const TaskModalForm = ({ visible, setVisible }) => {
  return (
    <Rodal
      visible={visible}
      onClose={() => setVisible(false)} animation='slideUp'
    >
      <div>Is it really working</div>
    </Rodal>
  );
};

TaskModalForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default TaskModalForm;
