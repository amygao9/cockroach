// Copyright 2020 The Cockroach Authors.
//
// Use of this software is governed by the Business Source License
// included in the file licenses/BSL.txt.
//
// As of the Change Date specified in that file, in accordance with
// the Business Source License, use of this software will be governed
// by the Apache License, Version 2.0, included in the file
// licenses/APL.txt.

import React from "react";
import { ReactWrapper } from "enzyme";
import { assert } from "chai";
import { times } from "lodash";
import Long from "long";

import { decommissionedNodesTableDataSelector, liveNodesTableDataSelector, NodeList, NodeStatusRow } from "./index";
import { AdminUIState } from "src/redux/state";
import { LocalSetting } from "src/redux/localsettings";
import { SortSetting } from "src/views/shared/components/sortabletable";
import { connectedMount } from "src/test-utils";
import { cockroach } from "src/js/protos";
import { livenessByNodeIDSelector } from "src/redux/nodes";

import NodeLivenessStatus = cockroach.storage.NodeLivenessStatus;

describe("Nodes Overview page", () => {
  describe("Live <NodeList/> section initial state", () => {
    const sortSetting = new LocalSetting<AdminUIState, SortSetting>(
      "nodes/live_sort_setting", (s) => s.localSettings,
    );
    const nodesCount = 9;
    const regionsCount = 3;

    const dataSource: NodeStatusRow[] = [
      {
        "key": "us-east1",
        "region": "us-east1",
        "nodesCount": 3,
        "replicas": 224,
        "usedCapacity": 0,
        "availableCapacity": 1610612736,
        "usedMemory": 1904611328,
        "availableMemory": 51539607552,
        "status": 6,
        "children": [
          {
            "key": "us-east1-0",
            "nodeId": 1,
            "region": "us-east1",
            "uptime": "3 minutes",
            "replicas": 78,
            "usedCapacity": 0,
            "availableCapacity": 536870912,
            "usedMemory": 639758336,
            "availableMemory": 17179869184,
            "version": "v20.1.0-alpha.20191118-1798-g0161286a62-dirty",
            "status": 3,
          },
          {
            "key": "us-east1-1",
            "nodeId": 2,
            "region": "us-east1",
            "uptime": "3 minutes",
            "replicas": 74,
            "usedCapacity": 0,
            "availableCapacity": 536870912,
            "usedMemory": 631373824,
            "availableMemory": 17179869184,
            "version": "v20.1.0-alpha.20191118-1798-g0161286a62-dirty",
            "status": 3,
          },
          {
            "key": "us-east1-2",
            "nodeId": 3,
            "region": "us-east1",
            "uptime": "3 minutes",
            "replicas": 72,
            "usedCapacity": 0,
            "availableCapacity": 536870912,
            "usedMemory": 633479168,
            "availableMemory": 17179869184,
            "version": "v20.1.0-alpha.20191118-1798-g0161286a62-dirty",
            "status": 3,
          },
        ],
      },
      {
        "key": "us-west1",
        "region": "us-west1",
        "nodesCount": 3,
        "replicas": 229,
        "usedCapacity": 0,
        "availableCapacity": 1610612736,
        "usedMemory": 1913843712,
        "availableMemory": 51539607552,
        "status": 6,
        "children": [
          {
            "key": "us-west1-0",
            "nodeId": 4,
            "region": "us-west1",
            "uptime": "3 minutes",
            "replicas": 73,
            "usedCapacity": 0,
            "availableCapacity": 536870912,
            "usedMemory": 634728448,
            "availableMemory": 17179869184,
            "version": "v20.1.0-alpha.20191118-1798-g0161286a62-dirty",
            "status": 3,
          },
          {
            "key": "us-west1-1",
            "nodeId": 5,
            "region": "us-west1",
            "uptime": "3 minutes",
            "replicas": 78,
            "usedCapacity": 0,
            "availableCapacity": 536870912,
            "usedMemory": 638218240,
            "availableMemory": 17179869184,
            "version": "v20.1.0-alpha.20191118-1798-g0161286a62-dirty",
            "status": 3,
          },
          {
            "key": "us-west1-2",
            "nodeId": 6,
            "region": "us-west1",
            "uptime": "3 minutes",
            "replicas": 78,
            "usedCapacity": 0,
            "availableCapacity": 536870912,
            "usedMemory": 640897024,
            "availableMemory": 17179869184,
            "version": "v20.1.0-alpha.20191118-1798-g0161286a62-dirty",
            "status": 3,
          },
        ],
      },
      {
        "key": "europe-west1",
        "region": "europe-west1",
        "nodesCount": 3,
        "replicas": 216,
        "usedCapacity": 0,
        "availableCapacity": 1610612736,
        "usedMemory": 1924988928,
        "availableMemory": 51539607552,
        "status": 6,
        "children": [
          {
            "key": "europe-west1-0",
            "nodeId": 7,
            "region": "europe-west1",
            "uptime": "3 minutes",
            "replicas": 71,
            "usedCapacity": 0,
            "availableCapacity": 536870912,
            "usedMemory": 641097728,
            "availableMemory": 17179869184,
            "version": "v20.1.0-alpha.20191118-1798-g0161286a62-dirty",
            "status": 3,
          },
          {
            "key": "europe-west1-1",
            "nodeId": 8,
            "region": "europe-west1",
            "uptime": "3 minutes",
            "replicas": 74,
            "usedCapacity": 0,
            "availableCapacity": 536870912,
            "usedMemory": 641945600,
            "availableMemory": 17179869184,
            "version": "v20.1.0-alpha.20191118-1798-g0161286a62-dirty",
            "status": 3,
          },
          {
            "key": "europe-west1-2",
            "nodeId": 9,
            "region": "europe-west1",
            "uptime": "3 minutes",
            "replicas": 71,
            "usedCapacity": 0,
            "availableCapacity": 536870912,
            "usedMemory": 641945600,
            "availableMemory": 17179869184,
            "version": "v20.1.0-alpha.20191118-1798-g0161286a62-dirty",
            "status": 3,
          },
        ],
      },
    ];

    it("displays correct header of Nodes section with total number of nodes", () => {
      const wrapper: ReactWrapper = connectedMount(store => (
        <NodeList
          dataSource={dataSource}
          nodesCount={nodesCount}
          regionsCount={regionsCount}
          setSort={sortSetting.set}
          sortSetting={sortSetting.selector(store.getState())}
        />));
      assert.equal(wrapper.find("h3.text.text--heading-3").text(), `Nodes (${nodesCount})`);
    });

    it("displays table with required columns when nodes partitioned by locality", () => {
      const wrapper: ReactWrapper = connectedMount(store => (
        <NodeList
          dataSource={dataSource}
          nodesCount={nodesCount}
          regionsCount={regionsCount}
          setSort={sortSetting.set}
          sortSetting={sortSetting.selector(store.getState())}
        />));
      const expectedColumns = [
        "nodes",
        "node count",
        "uptime",
        "replicas",
        "capacity use",
        "memory use",
        "version",
        "status",
        "", // logs column doesn't have header text
      ];
      const columnCells = wrapper.find(".table-section__content table thead th");
      assert.equal(columnCells.length, expectedColumns.length);

      expectedColumns.forEach(
        (columnName, idx) => assert.equal(columnCells.at(idx).text(), columnName));
    });

    it("doesn't display '# of nodes column' when nodes are in single regions", () => {
      const expectedColumns = [
        "nodes",
        // should not be displayed "node count",
        "uptime",
        "replicas",
        "capacity use",
        "memory use",
        "version",
        "status",
        "", // logs column doesn't have header text
      ];
      const singleRegionDataSource = dataSource[0];
      const wrapper = connectedMount(store => (
        <NodeList
          dataSource={[singleRegionDataSource]}
          nodesCount={singleRegionDataSource.children.length}
          regionsCount={1}
          setSort={sortSetting.set}
          sortSetting={sortSetting.selector(store.getState())}
        />));
      const columnCells = wrapper.find(".table-section__content table thead th");
      assert.equal(columnCells.length, expectedColumns.length);
      expectedColumns.forEach(
        (columnName, idx) => assert.equal(columnCells.at(idx).text(), columnName));
    });

    it("displays table with fixed column width", () => {
      const wrapper: ReactWrapper = connectedMount(store => (
        <NodeList
          dataSource={dataSource}
          nodesCount={nodesCount}
          regionsCount={regionsCount}
          setSort={sortSetting.set}
          sortSetting={sortSetting.selector(store.getState())}
        />));
      const columnAttributes = wrapper.find("table colgroup col");
      columnAttributes.forEach(node => assert.exists(node.hostNodes().props().style.width));
    });
  });

  describe("Selectors", () => {
    const state = {
      cachedData: {
        nodes: {
          data: times(7).map(idx => (
            {
              desc: { node_id: idx + 1, locality: {}},
              metrics: {
                "capacity.used": 0,
                "capacity.available": 0,
              },
              started_at: Long.fromNumber(Date.now()),
              total_system_memory: Long.fromNumber(Math.random() * 1000000),
              build_info: {
                tag: "tag_value",
              },
            }
          )),
          inFlight: false,
          valid: true,
        },
        liveness: {
          data: {
            livenesses: [
              { node_id: 1},
              { node_id: 2, expiration: { wall_time: Long.fromNumber(Date.now()) }},
              { node_id: 3},
              { node_id: 4},
              { node_id: 5},
              { node_id: 6},
              { node_id: 7, expiration: { wall_time: Long.fromNumber(Date.now()) }},
            ],
            statuses: {
              1: NodeLivenessStatus.LIVE,
              2: NodeLivenessStatus.DECOMMISSIONED, // node_id: 2
              3: NodeLivenessStatus.DEAD,
              4: NodeLivenessStatus.UNAVAILABLE,
              5: NodeLivenessStatus.UNKNOWN,
              6: NodeLivenessStatus.DECOMMISSIONING,
              7: NodeLivenessStatus.DECOMMISSIONED, // node_id: 7
            },
            toJSON: () => ({}),
          },
          inFlight: false,
          valid: true,
        },
      },
    };
    const partitionedNodes = {
      live: [
        state.cachedData.nodes.data[0],
        state.cachedData.nodes.data[2],
        state.cachedData.nodes.data[3],
        state.cachedData.nodes.data[4],
        state.cachedData.nodes.data[5],
      ],
      decommissioned: [
        state.cachedData.nodes.data[1],
        state.cachedData.nodes.data[6],
      ],
    };
    const nodeSummary: any = {
      livenessStatusByNodeID: state.cachedData.liveness.data.statuses,
      livenessByNodeID: livenessByNodeIDSelector.resultFunc(state.cachedData.liveness.data),
      nodeIDs: undefined,
      nodeDisplayNameByID: undefined,
      nodeStatusByID: undefined,
      nodeStatuses: undefined,
      nodeSums: undefined,
      storeIDsByNodeID: undefined,
    };

    describe("decommissionedNodesTableDataSelector", () => {
      it("returns node records with 'decommissioned' status only", () => {
        const expectedDecommissionedNodeIds = [2, 7];
        const records = decommissionedNodesTableDataSelector.resultFunc(partitionedNodes, nodeSummary);

        assert.lengthOf(records, expectedDecommissionedNodeIds.length);
        records.forEach(record => {
          assert.isTrue(expectedDecommissionedNodeIds.some(nodeId => nodeId === record.nodeId));
        });
      });
    });

    describe("liveNodesTableDataSelector", () => {
      it("returns node records with all statuses except 'decommissioned' status", () => {
        const expectedLiveNodeIds = [1, 3, 4, 5, 6];
        const recordsGroupedByRegion = liveNodesTableDataSelector.resultFunc(partitionedNodes, nodeSummary);

        assert.lengthOf(recordsGroupedByRegion, 1);
        assert.lengthOf(recordsGroupedByRegion[0].children, expectedLiveNodeIds.length);
        recordsGroupedByRegion[0].children.forEach(record => {
          assert.isTrue(expectedLiveNodeIds.some(nodeId => nodeId === record.nodeId));
        });
      });
    });
  });
});
