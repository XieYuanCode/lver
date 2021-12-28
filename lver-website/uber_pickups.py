# import streamlit as st
# import pandas as pd
# import numpy as np
# import altair as alt

# st.set_page_config(
#      page_title="Lver ChangeLog",
#      page_icon="🧊",
#      layout="wide",
#      initial_sidebar_state="expanded",
#      menu_items={
#          'Get Help': 'https://www.extremelycoolapp.com/help',
#          'Report a bug': "https://www.extremelycoolapp.com/bug",
#          'About': "# This is Lver ChangeLog",
#      }
#  )

# add_selectbox = st.sidebar.selectbox(
#   "Choose version",
#   ("v1.0.0", "v1.0.1", "v1.0.2")
# )

# st.title("Lver ChangeLog")
# st.header("v1.0.0")
# st.subheader("Features")
# st.text("Features 1")
# st.text("Features 2")
# st.text("Features 3")
# st.text("Features 4")

# st.subheader("Bug Fixes")
# st.text("Bug 1")
# st.text("Bug 2")
# st.text("Bug 3")
# st.text("Bug 4")
import streamlit as st
import pandas as pd
import numpy as np

st.title('Uber pickups in NYC')

DATE_COLUMN = 'date/time'
DATA_URL = ('https://s3-us-west-2.amazonaws.com/'
            'streamlit-demo-data/uber-raw-data-sep14.csv.gz')

@st.cache
def load_data(nrows):
    data = pd.read_csv(DATA_URL, nrows=nrows)
    lowercase = lambda x: str(x).lower()
    data.rename(lowercase, axis='columns', inplace=True)
    data[DATE_COLUMN] = pd.to_datetime(data[DATE_COLUMN])
    return data

data_load_state = st.text('Loading data...')
data = load_data(10000)
data_load_state.text("Done! (using st.cache)")

if st.checkbox('Show raw data'):
    st.subheader('Raw data')
    st.write(data)

st.subheader('Number of pickups by hour')
hist_values = np.histogram(data[DATE_COLUMN].dt.hour, bins=24, range=(0,24))[0]
st.bar_chart(hist_values)

# Some number in the range 0-23
hour_to_filter = st.slider('hour', 0, 23, 17)
filtered_data = data[data[DATE_COLUMN].dt.hour == hour_to_filter]

st.subheader('Map of all pickups at %s:00' % hour_to_filter)
st.map(filtered_data)
