import styles from './styles.module.scss';
import Scrollbars from 'react-custom-scrollbars-2';
import Button from 'components/Button';
import InputField from 'components/InputField';
import { useFormik } from 'formik';
import { Fragment, useEffect, useRef, useState } from 'react';
import { ReactComponent as RobotSvg } from 'assets/images/icons/robot.svg';
import { ReactComponent as RobotAvatarSvg } from 'assets/images/icons/robot_avatar.svg';
import { ReactComponent as BackSvg } from 'assets/images/icons/back.svg';
import axios from 'axios';

type IReceiveMsg = {
  message: string;
  name: string;
  __createdtime__: Date | number;
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
    if (contentRefs.current) {
      contentRefs.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
    console.log('message');
    
  }, [messages]);

  useEffect(() => {
    (async () => {
      // const response = axios.post('http://localhost:5050', {
      //   prompt: 'hello', // message
      // });
      const response = axios.get('http://localhost:5050').then((res)=>{
        setMessages((state) => [
          ...state,
          {
            message:res.data.message,
            name:'bot',
            __createdtime__:Date.now(),
          },
        ]);
      });
      console.log(response, 'response');
    })();
    console.log('response');

  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      room: '',
      message: '',
    },
    onSubmit: (values) => {
      // login root
      //   console.log(values, 'values');
      const { name } = values;
      const room = 'default';
      if (name !== '') {
        setLoginState(true);
      }
    },
  });

  const sendMessage = () => {
    const message = formik.values.message;
    const name = formik.values.name;
    const createdtime = Date.now();
    setMessages((state) => [
      ...state,
      {
        message,
        name,
        __createdtime__:createdtime,
      },
    ]);
    const response = axios.post('http://localhost:5050', {
      prompt: message, // message
    }).then((res)=>{
      const time = Date.now();
      setMessages((state) => [
        ...state,
        {
          message:res.data.bot,
          name:'bot',
          __createdtime__:time,
        },
      ]);
    })

    formik.setFieldValue('message', '');
  };

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    const name = formik.values.name;
    const room = 'default';
    
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
