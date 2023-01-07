import styles from './styles.module.scss';
import Scrollbars from 'react-custom-scrollbars-2';
import { io } from 'socket.io-client';
import Button from 'components/Button';
import InputField from 'components/InputField';
import { useFormik } from 'formik';
import { Fragment, useEffect, useRef, useState } from 'react';
import { ReactComponent as RobotSvg } from 'assets/images/icons/robot.svg';
import { ReactComponent as RobotAvatarSvg } from 'assets/images/icons/robot_avatar.svg';
import { ReactComponent as BackSvg } from 'assets/images/icons/back.svg';

const socket = io('http://localhost:5050');

type IReceiveMsg = {
  message: string;
  name: string;
  __createdtime__: Date;
  // id?: number;
};

// save message in localstorage
// save room id in localstorage
// when refresh , get room id and correct message
// save name and only nameId in localstorage , when refresh can get history

export default function ChatRoom() {
  const [loginState, setLoginState] = useState<boolean>(false);
  const [messages, setMessages] = useState<IReceiveMsg[]>([]);
  const contentRefs = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((state) => [
        ...state,
        {
          message: data.message,
          name: data.name,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });
    socket.on('messageResponse', (data) => {
      setMessages((state) => [
        ...state,
        {
          message: data.message,
          name: data.name,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });

    // Remove event listener on component unmount
    return () => {
      socket.off('receive_message');
      socket.off('messageResponse');
    };
  }, [socket]);

  useEffect(() => {
    if (contentRefs.current) {
      contentRefs.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
  }, [messages]);

  const formik = useFormik({
    initialValues: {
      name: '',
      room: '',
      message: '',
    },
    onSubmit: (values) => {
      //   console.log(values, 'values');
      const { name } = values;
      const room = 'default';
      if (name !== '') {
        socket.emit('join_room', { name, room });
        setLoginState(true);
      }
    },
  });

  const sendMessage = () => {
    socket.emit('message', {
      message: formik.values.message,
      name: formik.values.name,
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
      __createdtime__: Date.now(),
    });
    formik.setFieldValue('message', '');
  };

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    const name = formik.values.name;
    const room = 'default';
    socket.emit('leave_room', { name, room, __createdtime__ });
    setLoginState(false);
    formik.setFieldValue('name', '');
    setMessages([]);
  };

  const loginRoom = () => {
    return (
      <form className={styles.login} onSubmit={formik.handleSubmit}>
        <div className={styles.logo}>
          <RobotSvg width={60} />
          <h3>Test Channel</h3>
        </div>
        <label htmlFor="">UserName :</label>
        <InputField
          className={styles.input}
          field={formik.getFieldProps('name')}
          autoFocus
        />
        {/* <InputField
          className={styles.input}
          field={formik.getFieldProps('room')}
        /> */}
        <Button className={styles.join} type="submit">
          Join Room
        </Button>
      </form>
    );
  };

  const completeRoom = () => {
    return (
      <Fragment>
        <div className={styles.leave} onClick={leaveRoom}>
          <BackSvg width={24} height={24} />
        </div>
        <div className={styles.header}>
          <RobotAvatarSvg width={30} />
          Robot Chat
        </div>
        <Scrollbars
          className={styles.content}
          autoHide
          autoHideTimeout={800}
          autoHideDuration={200}
        >
          <div className={styles.container} ref={contentRefs}>
            {messages &&
              messages.map((data, i) => {
                return data.name === formik.values.name ? (
                  <div className={styles.sendUser} key={i}>
                    <div>
                      <div className={styles.img}>
                        <RobotSvg />
                      </div>
                      <div className={styles.msg}>{data.message}</div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.receiveUser} key={i}>
                    <div>
                      <div className={styles.img}>
                        <RobotSvg />
                      </div>
                      <div className={styles.msg}>{data.message}</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </Scrollbars>
        <div className={styles.send_Wrap}>
          <InputField
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
            className={styles.input_msg}
            field={formik.getFieldProps('message')}
            type="text"
            placeholder="Type message here..."
            autoComplete="off"
            autoFocus
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </Fragment>
    );
  };
  return (
    <div className={styles.root}>
      {loginState ? completeRoom() : loginRoom()}
    </div>
  );
}
