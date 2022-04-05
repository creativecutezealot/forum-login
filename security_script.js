import Pipeline from "@pipeline-ui-2/pipeline";
import "regenerator-runtime/runtime";

window.pipelineConnector = "myAlgoWallet";

const myAlgoWallet = Pipeline.init();

async function handleConnect() {
  try {
    Pipeline.pipeConnector = window.pipelineConnector;
    const data = await Pipeline.connect(myAlgoWallet);
    console.log(data);
    return data;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
}

document.getElementById("walletswitch").innerHTML = `
<select id="walletswitchmain" class="crayons-select">
  <option>myAlgoWallet</option>
  <option>WalletConnect</option>
  <option>AlgoSigner</option>
  </select>
`;

document.getElementById("algbtn").addEventListener("click", async (event) => {
  if (document.getElementById("walletswitchmain").value == "myAlgoWallet") {
    const address = await handleConnect();
    console.log('address: ', address);
    if (address == null) {
      event.preventDefault();
    } else {
      document.getElementById("login-form").submit();
    }
  }
});

document.getElementById("walletswitchmain").onchange = () => handleSwitch();

function handleSwitch() {
  window.pipelineConnector = document.getElementById("walletswitchmain").value;
  console.log(window.pipelineConnector);
}
